from pydantic import BaseModel
from typing import Dict, Any, Optional, List

class AOIRequest(BaseModel):
    aoi: Dict[str, Any]
    start_date: str
    end_date: str

class LULCResponse(BaseModel):
    tile_url: str
    stats: Optional[Dict[str, Any]] = None
    aoi_area_km2: float

class TimelineRequest(BaseModel):
    aoi: Dict[str, Any]
    start_year: int
    end_year: int

class TimelineYearData(BaseModel):
    year: int
    tile_url: str
    stats: Dict[str, Any]

class TimelineResponse(BaseModel):
    timeline: List[TimelineYearData]
    aoi_area_km2: float

class BaselineRequest(BaseModel):
    aoi: Dict[str, Any]
    baseline_year: int

class BaselineResponse(BaseModel):
    baseline_id: str
    baseline_year: int
    tile_url: str
    stats: Dict[str, Any]
    area_km2: float
    locked: bool
    created_at: str
    locked_at: Optional[str] = None

class LockBaselineRequest(BaseModel):
    baseline_id: str
    locked_by: Optional[str] = "user"

class ChangeDetectionRequest(BaseModel):
    baseline_id: str
    current_year: int
    aoi: Dict[str, Any]

class ClassChange(BaseModel):
    class_id: int
    class_name: str
    baseline_pct: float
    current_pct: float
    baseline_km2: float
    current_km2: float
    change_km2: float
    change_pct: float
    summary: str

class Transition(BaseModel):
    from_class: str
    to_class: str
    area_km2: float
    description: str

class ChangeDetectionResponse(BaseModel):
    baseline_year: int
    current_year: int
    years_elapsed: int
    changes: Dict[str, ClassChange]
    transitions: Dict[str, Transition]
    summary: Dict[str, Any]
    current_tile_url: str

class RiskFlag(BaseModel):
    type: str
    severity: str
    score_impact: int
    reason: str
    explanation: str
    recommendation: str

class RiskAssessmentResponse(BaseModel):
    risk_score: int
    risk_level: str
    permanence_confidence: int
    flags: List[RiskFlag]
    total_flags: int
    critical_flags: int
    high_flags: int
    summary: Dict[str, Any]

class ZoneStats(BaseModel):
    baseline_forest_pct: float
    current_forest_pct: float
    deforestation_pct: float
    area_km2: float

class LeakageAnalysisResponse(BaseModel):
    leakage_detected: bool
    leakage_severity: str
    leakage_ratio: float
    buffer_km: int
    buffer_tile_url: str
    project_area: ZoneStats
    buffer_zone: ZoneStats
    summary: str
    recommendation: str

class DACBRequest(BaseModel):
    aoi: Dict[str, Any]
    baseline_year: int
    current_year: int
    buffer_km: int = 5
    use_knn: bool = True

class ControlAreaQuality(BaseModel):
    similarity_score: float
    quality: str
    project_forest_pct: float
    control_forest_pct: float

class DACBResponse(BaseModel):
    baseline_model: str
    baseline_year: int
    current_year: int
    years_elapsed: int
    buffer_km: int
    project_tile_url: str
    control_tile_url: str
    control_geojson: Dict[str, Any]
    project_forest_baseline_km2: float
    project_forest_current_km2: float
    control_forest_baseline_km2: float
    control_forest_current_km2: float
    control_trend_km2_per_year: float
    expected_forest_km2: float
    observed_forest_km2: float
    avoided_deforestation_km2: float
    leakage_ratio: float
    leakage_severity: str
    leakage_adjustment_factor: float
    adjusted_avoided_deforestation_km2: float
    permanence_score: float
    control_area_quality: ControlAreaQuality
    confidence: str
    control_selection: Dict[str, Any]
