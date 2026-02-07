import ee
import pandas as pd
import numpy as np
from services.gee_init import init_gee

# Initialize Earth Engine
init_gee()

# ESA WorldCover 10m V200 Tree Classes: 10 (Trees), 95 (Mangroves)
TREE_CLASSES = [10, 95]

def extract_year_stats(aoi, year):
    try:
        # 1. LANDCOVER (LULC) - Using ESA WorldCover 10m
        # ----------------------------------------------------------------------
        lc_collection = ee.ImageCollection("ESA/WorldCover/v200")
        lc_image = lc_collection.first().select("Map").clip(aoi)
        
        area_stats = lc_image.reduceRegion(
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

        # 2. GEDI (Canopy Height Model)
        # ----------------------------------------------------------------------
        gedi_collection = (
            ee.ImageCollection("LARSE/GEDI/GEDI02_A_002_MONTHLY")
            .filterBounds(aoi)
            .filterDate(f"{year}-01-01", f"{year}-12-31")
            .select("rh100")
        )

        mean_img = gedi_collection.mean().clip(aoi)
        
        samples = mean_img.sample(
            region=aoi, 
            scale=25, 
            numPixels=2000, 
            geometries=False, 
            tileScale=4
        ).getInfo()

        feats = samples.get("features", [])
        
        # Defaults
        model_prediction = {"avg": 0.0, "min": 0.0, "max": 0.0, "std": 0.0}
        pixel_count = 0
        tree_count = {"total": 0, "per_hectare": 0}

        if feats:
            df = pd.DataFrame([f["properties"] for f in feats])
            if not df.empty and "rh100" in df.columns:
                valid_heights = df[df["rh100"] >= 0]["rh100"]
                if not valid_heights.empty:
                    model_prediction = {
                        "avg": round(float(valid_heights.mean()), 2),
                        "min": round(float(valid_heights.min()), 2),
                        "max": round(float(valid_heights.max()), 2),
                        "std": round(float(valid_heights.std()), 2) if len(valid_heights) > 1 else 0.0
                    }
                    pixel_count = len(valid_heights)
                    
                    trees_per_ha = 400 if model_prediction["avg"] > 5 else 100
                    tree_count = {
                        "total": int(eligible_ha * trees_per_ha),
                        "per_hectare": trees_per_ha
                    }

        # 3. CONSOLIDATED RESPONSE (Matched to UI Hierarchy)
        # ----------------------------------------------------------------------
        return {
            "year": year,
            "total_area_ha": round(total_ha, 2), # AOI Area First
            "pixel_count": pixel_count,
            "model_prediction": model_prediction, # Lidar Stats Second
            "eligibility": {                      # Eligibility Third
                "percentage": eligibility_pct,
                "eligible_ha": eligible_ha,
                "ineligible_ha": round(total_ha - eligible_ha, 2),
                "breakdown": breakdown
            },
            "tree_count": tree_count              # Biomass Fourth
        }

    except Exception as e:
        print(f"Error in extract_year_stats for {year}: {str(e)}")
        return None

def extract_chm_timeseries(geojson, start=2019, end=2024):
    try:
        geometry = geojson.get("geometry", geojson)
        aoi = ee.Geometry(geometry)
        
        yearly_data = []
        for year in range(start, end + 1):
            stat = extract_year_stats(aoi, year)
            if stat:
                yearly_data.append(stat)
        return yearly_data
    except Exception as e:
        print(f"Geometry Error: {str(e)}")
        return []