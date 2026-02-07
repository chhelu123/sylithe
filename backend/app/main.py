from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import (
    AOIRequest, LULCResponse, TimelineRequest, TimelineResponse, TimelineYearData,
    BaselineRequest, BaselineResponse, LockBaselineRequest,
    ChangeDetectionRequest, ChangeDetectionResponse, RiskAssessmentResponse,
    LeakageAnalysisResponse, DACBRequest, DACBResponse
)
from app.gee_service import init_gee, generate_lulc
from app.database import (
    init_db, hash_aoi, get_cached, save_cache, log_request,
    hash_baseline, get_baseline, save_baseline, lock_baseline, is_baseline_locked
)
from app.change_detection import calculate_changes, detect_key_transitions, generate_change_summary
from app.risk_assessment import assess_carbon_risk
from app.leakage_analysis import analyze_leakage
from app.dacb_service import dacb_analysis
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Sylithe LULC API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()
    init_gee()

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.post("/api/lulc/analyze", response_model=LULCResponse)
def analyze_lulc(request: AOIRequest):
    try:
        # Check cache
        aoi_hash = hash_aoi(request.aoi, request.start_date, request.end_date)
        cached = get_cached(aoi_hash)
        
        if cached:
            return LULCResponse(
                tile_url=cached[0],
                stats=eval(cached[1]) if cached[1] else None,
                aoi_area_km2=0
            )
        
        # Generate LULC
        result = generate_lulc(request.aoi, request.start_date, request.end_date)
        
        # Validate AOI size
        max_area = float(os.getenv("MAX_AOI_AREA_KM2", 10000))
        if result["area_km2"] > max_area:
            raise HTTPException(400, f"AOI exceeds max area of {max_area} km²")
        
        # Cache and log
        save_cache(aoi_hash, result["tile_url"], result["stats"])
        log_request(request.aoi, result["tile_url"], result["stats"])
        
        return LULCResponse(
            tile_url=result["tile_url"],
            stats=result["stats"],
            aoi_area_km2=result["area_km2"]
        )
    except Exception as e:
        raise HTTPException(500, str(e))

@app.post("/api/lulc/timeline", response_model=TimelineResponse)
def analyze_timeline(request: TimelineRequest):
    try:
        timeline = []
        area_km2 = 0
        
        for year in range(request.start_year, request.end_year + 1):
            start_date = f"{year}-01-01"
            end_date = f"{year}-12-31"
            
            # Check cache
            aoi_hash = hash_aoi(request.aoi, start_date, end_date)
            cached = get_cached(aoi_hash)
            
            if cached:
                timeline.append(TimelineYearData(
                    year=year,
                    tile_url=cached[0],
                    stats=eval(cached[1]) if cached[1] else {}
                ))
            else:
                # Generate LULC for this year
                result = generate_lulc(request.aoi, start_date, end_date)
                area_km2 = result["area_km2"]
                
                # Cache result
                save_cache(aoi_hash, result["tile_url"], result["stats"])
                
                timeline.append(TimelineYearData(
                    year=year,
                    tile_url=result["tile_url"],
                    stats=result["stats"]
                ))
        
        return TimelineResponse(
            timeline=timeline,
            aoi_area_km2=area_km2
        )
    except Exception as e:
        raise HTTPException(500, str(e))

@app.post("/api/baseline/create", response_model=BaselineResponse)
def create_baseline(request: BaselineRequest):
    try:
        # Generate baseline ID
        baseline_id = hash_baseline(request.aoi, request.baseline_year)
        
        # Check if baseline already exists
        existing = get_baseline(baseline_id)
        if existing:
            if existing["locked"]:
                raise HTTPException(400, "Baseline already locked. Cannot modify.")
            return BaselineResponse(**existing)
        
        # Generate LULC for baseline year
        start_date = f"{request.baseline_year}-01-01"
        end_date = f"{request.baseline_year}-12-31"
        result = generate_lulc(request.aoi, start_date, end_date)
        
        # Save baseline
        save_baseline(
            baseline_id,
            request.aoi,
            request.baseline_year,
            result["stats"],
            result["tile_url"],
            result["area_km2"]
        )
        
        # Get saved baseline
        baseline = get_baseline(baseline_id)
        return BaselineResponse(**baseline)
    except Exception as e:
        raise HTTPException(500, str(e))

@app.post("/api/baseline/lock")
def lock_baseline_endpoint(request: LockBaselineRequest):
    try:
        # Check if baseline exists
        baseline = get_baseline(request.baseline_id)
        if not baseline:
            raise HTTPException(404, "Baseline not found")
        
        # Check if already locked
        if baseline["locked"]:
            raise HTTPException(400, "Baseline already locked")
        
        # Lock baseline
        lock_baseline(request.baseline_id, request.locked_by)
        
        return {
            "success": True,
            "message": "Baseline locked successfully",
            "baseline_id": request.baseline_id,
            "locked_at": baseline["locked_at"]
        }
    except Exception as e:
        raise HTTPException(500, str(e))

@app.get("/api/baseline/{baseline_id}", response_model=BaselineResponse)
def get_baseline_endpoint(baseline_id: str):
    try:
        baseline = get_baseline(baseline_id)
        if not baseline:
            raise HTTPException(404, "Baseline not found")
        return BaselineResponse(**baseline)
    except Exception as e:
        raise HTTPException(500, str(e))

@app.post("/api/change-detection", response_model=ChangeDetectionResponse)
def detect_changes(request: ChangeDetectionRequest):
    try:
        # Get baseline
        baseline = get_baseline(request.baseline_id)
        if not baseline:
            raise HTTPException(404, "Baseline not found")
        
        # Get current year LULC
        start_date = f"{request.current_year}-01-01"
        end_date = f"{request.current_year}-12-31"
        current_result = generate_lulc(request.aoi, start_date, end_date)
        
        # Calculate changes
        changes = calculate_changes(
            baseline["stats"],
            current_result["stats"],
            current_result["area_km2"]
        )
        
        # Detect transitions
        transitions = detect_key_transitions(
            baseline["stats"],
            current_result["stats"]
        )
        
        # Generate summary
        summary = generate_change_summary(
            changes,
            baseline["baseline_year"],
            request.current_year
        )
        
        return ChangeDetectionResponse(
            baseline_year=baseline["baseline_year"],
            current_year=request.current_year,
            years_elapsed=request.current_year - baseline["baseline_year"],
            changes=changes,
            transitions=transitions,
            summary=summary,
            current_tile_url=current_result["tile_url"]
        )
    except Exception as e:
        raise HTTPException(500, str(e))

@app.post("/api/risk-assessment", response_model=RiskAssessmentResponse)
def assess_risk(request: ChangeDetectionRequest):
    try:
        # Get baseline
        baseline = get_baseline(request.baseline_id)
        if not baseline:
            raise HTTPException(404, "Baseline not found")
        
        # Get current year LULC
        start_date = f"{request.current_year}-01-01"
        end_date = f"{request.current_year}-12-31"
        current_result = generate_lulc(request.aoi, start_date, end_date)
        
        # Get timeline for volatility calculation (optional)
        timeline_stats = None
        try:
            timeline_result = []
            for year in range(baseline["baseline_year"], request.current_year + 1):
                year_start = f"{year}-01-01"
                year_end = f"{year}-12-31"
                year_result = generate_lulc(request.aoi, year_start, year_end)
                timeline_result.append({
                    "year": year,
                    "stats": year_result["stats"]
                })
            timeline_stats = timeline_result
        except:
            pass  # Timeline is optional
        
        # Assess risk
        risk_assessment = assess_carbon_risk(
            baseline["stats"],
            current_result["stats"],
            timeline_stats
        )
        
        return RiskAssessmentResponse(**risk_assessment)
    except Exception as e:
        raise HTTPException(500, str(e))

@app.post("/api/leakage-analysis", response_model=LeakageAnalysisResponse)
def analyze_leakage_endpoint(request: ChangeDetectionRequest):
    try:
        # Get baseline
        baseline = get_baseline(request.baseline_id)
        if not baseline:
            raise HTTPException(404, "Baseline not found")
        
        # Analyze leakage
        leakage_result = analyze_leakage(
            request.aoi,
            baseline["baseline_year"],
            request.current_year,
            buffer_km=5
        )
        
        return LeakageAnalysisResponse(**leakage_result)
    except Exception as e:
        raise HTTPException(500, str(e))

@app.post("/api/dacb/analyze", response_model=DACBResponse)
def analyze_dacb(request: DACBRequest):
    try:
        # Run DACB analysis
        dacb_result = dacb_analysis(
            request.aoi,
            request.baseline_year,
            request.current_year,
            request.buffer_km,
            request.use_knn
        )
        
        return DACBResponse(**dacb_result)
    except Exception as e:
        raise HTTPException(500, str(e))
