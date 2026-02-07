import ee
import pandas as pd
from services.gee_init import init_gee

# Initialize Google Earth Engine
init_gee()

def run_chm_inference(geojson, year):
    """
    This is the main function app.py is looking for.
    It takes the polygon from the frontend and returns the 
    stats using your specific logic.
    """
    try:
        # Convert GeoJSON to EE Geometry
        geometry = geojson.get("geometry", geojson)
        aoi = ee.Geometry(geometry)
        
        # Call the extraction logic (your early code logic)
        return extract_year_stats(aoi, year)
    except Exception as e:
        print(f"Inference Error: {e}")
        return None

def extract_year_stats(aoi, year):
    """
    Your Early Code Logic - Optimized for UI Hierarchy:
    1. AOI Area (Hectares)
    2. Lidar Statistics
    3. Land Eligibility
    4. Biomass Estimation
    """
    try:
        # --- 1. LANDCOVER (LULC) ---
        lc = ee.ImageCollection("ESA/WorldCover/v200").first().select("Map").clip(aoi)
        
        area_stats = lc.reduceRegion(
            reducer=ee.Reducer.frequencyHistogram(),
            geometry=aoi,
            scale=10,
            maxPixels=1e9
        ).getInfo().get('Map', {})

        if not area_stats:
            return None

        def to_ha(pixels): 
            return round((float(pixels) * 100) / 10000, 2)

        breakdown = {
            "trees": to_ha(area_stats.get('10', 0)),
            "mangroves": to_ha(area_stats.get('95', 0)),
            "urban": to_ha(area_stats.get('50', 0)),
            "water": to_ha(area_stats.get('80', 0)),
            "other": to_ha(sum(float(v) for k, v in area_stats.items() if k not in ['10', '95', '50', '80']))
        }

        total_ha = sum(breakdown.values())
        eligible_ha = breakdown["trees"] + breakdown["mangroves"]
        eligibility_pct = round((eligible_ha / total_ha * 100), 2) if total_ha > 0 else 0

        # --- 2. GEDI (Canopy Height Statistics) ---
        gedi_col = (
            ee.ImageCollection("LARSE/GEDI/GEDI02_A_002_MONTHLY")
            .filterBounds(aoi)
            .filterDate(f"{year}-01-01", f"{year}-12-31")
            .select("rh100")
        )

        mean_img = gedi_col.mean().clip(aoi)
        samples = mean_img.sample(region=aoi, scale=25, numPixels=1000, geometries=False).getInfo()
        feats = samples.get("features", [])
        
        height_data = [f['properties']['rh100'] for f in feats if 'rh100' in f['properties']]
        
        model_prediction = {
            "avg": round(sum(height_data) / len(height_data), 2) if height_data else 0.0,
            "min": round(min(height_data), 2) if height_data else 0.0,
            "max": round(max(height_data), 2) if height_data else 0.0,
            "std": round(float(pd.Series(height_data).std()), 2) if len(height_data) > 1 else 0.0
        }

        # --- 3. FINAL RESPONSE STRUCTURE (Matches UI) ---
        return {
            "year": year,
            "total_area_ha": round(total_ha, 2),
            "model_prediction": model_prediction,
            "eligibility": {
                "percentage": eligibility_pct,
                "eligible_ha": eligible_ha,
                "ineligible_ha": round(total_ha - eligible_ha, 2),
                "breakdown": breakdown
            },
            "tree_count": {
                "total": int(eligible_ha * 400),
                "per_hectare": 400
            }
        }

    except Exception as e:
        print(f"GEE Feature Extraction Error: {str(e)}")
        return None

def extract_chm_timeseries(geojson, start=2019, end=2024):
    try:
        geometry = geojson.get("geometry", geojson)
        aoi = ee.Geometry(geometry)
        yearly_results = []
        for year in range(start, end + 1):
            stat = extract_year_stats(aoi, year)
            if stat:
                yearly_results.append(stat)
        return yearly_results
    except Exception as e:
        print(f"Fatal error in timeseries extraction: {e}")
        return []