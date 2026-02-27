import ee
import pickle as pkl
import pandas as pd
import numpy as np
import os
import warnings
from services.gee_init import init_gee

warnings.filterwarnings('ignore', category=UserWarning)
init_gee()

MODEL_PATH = "/Users/karan/Desktop/sylithe-website/backend/models/Sylithe_BayesOpt_Model.pkl"

def load_model():
    if not os.path.exists(MODEL_PATH): 
        print(f"❌ Error: Model file not found at {MODEL_PATH}")
        return None
    try:
        import xgboost 
        with open(MODEL_PATH, 'rb') as f: 
            loaded_model = pkl.load(f)
            if hasattr(loaded_model, 'predict'):
                print("✅ CHM Model loaded successfully.")
                return loaded_model
            return None
    except Exception as e: 
        print(f"❌ Error loading model: {e}")
        return None

model = load_model()

def run_chm_inference(geojson, year):
    try:
        if model is None:
            return {"status": "error", "message": "ML Model not loaded."}

        geometry = geojson.get("geometry", geojson)
        aoi = ee.Geometry(geometry)
        
        # --- ULTRA-STRICT LULC FILTERING ---
        lc = ee.ImageCollection("ESA/WorldCover/v200").first().clip(aoi)
        
        # Sirf Trees (10) aur Mangroves (95) ko allow karenge
        # Shrubland aur Grassland hata diye taaki urban greenery mix na ho
        strict_mask = lc.eq(10).Or(lc.eq(95))
        
        # Stats Calculation
        lc_stats = lc.reduceRegion(ee.Reducer.frequencyHistogram(), aoi, 10, maxPixels=1e9).getInfo().get('Map', {})
        total_px = sum(float(v) for v in lc_stats.values())
        
        # Forest pixels (for reference/CHM model)
        forest_px = float(lc_stats.get('10', 0)) + float(lc_stats.get('95', 0))
        forest_pct = (forest_px / total_px * 100) if total_px > 0 else 0
        
        # Reforestation suitability pixels: Cropland (40), Grassland (30/20), Bareland (60)
        suitable_px = float(lc_stats.get('40', 0)) + float(lc_stats.get('30', 0)) + float(lc_stats.get('20', 0)) + float(lc_stats.get('60', 0))
        suitability_pct = (suitable_px / total_px * 100) if total_px > 0 else 0

        # We must disable the previous forest cutoff because users want to analyze fully bare land 
        # to assess its suitability for reforestation! Blocking areas with no trees defeats the purpose.
        # if forest_pct < 15:
        #     return {
        #         "status": "error", 
        #         "message": "Land is not suitable. Selected area is primarily Built-up, Water, or Barren."
        #     }

        # --- DATA FETCH ---
        s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED').filterBounds(aoi).filterDate(f"{year}-01-01", f"{year}-12-31").filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30)).median()
        ndvi = s2.normalizedDifference(['B8','B4']).rename('NDVI')
        s1 = ee.ImageCollection('COPERNICUS/S1_GRD').filterBounds(aoi).median()
        dem = ee.Image('USGS/SRTMGL1_003').resample('bilinear').clip(aoi)

        stack = ee.Image.cat([
            s2.select(['B2','B3','B4','B5','B6','B7','B8','B8A','B11','B12']),
            ndvi, s1.select(['VV', 'VH']), dem.rename('elev')
        ]).updateMask(strict_mask).clip(aoi)

        pixels = stack.sample(region=aoi, scale=10, numPixels=5000, geometries=True, dropNulls=True).getInfo()
        features = pixels.get('features', [])
        
        # Maintain variables for frontend response
        avg_h, max_h = 0, 0
        if features:
            # --- PREDICTION ---
            df = pd.DataFrame([f['properties'] for f in features])
            df['lat'] = [f['geometry']['coordinates'][1] for f in features]
            df['Radar_Volume'] = df['VH'] * df['NDVI']
            df['Eco_Zone'] = df['lat'].abs() * df.get('elev', 0)

            cols = getattr(model, 'feature_names_in_', [])
            X = df.reindex(columns=cols, fill_value=0)
            y_heights = np.expm1(model.predict(X))
            valid = y_heights[(y_heights >= 1.0) & (y_heights < 95)]
            if len(valid) > 0:
                avg_h = round(float(np.mean(valid)), 1)
                max_h = round(float(np.max(valid)), 1)
        
        # Maintain older code LULC structures for frontend sidebar logic
        def to_ha(px): return round((float(px) * 100) / 10000, 2)
        def get_tile(val, color):
            mask = lc.eq(val)
            return mask.updateMask(mask).getMapId({'palette': [color]})['tile_fetcher'].url_format
        
        # Calculate Deforestation and Burn simple proxies to prevent crashing the frontend UI
        s2_2018 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED').filterBounds(aoi).filterDate('2018-01-01', '2018-12-31').median()
        ndvi_2018 = s2_2018.normalizedDifference(['B8', 'B4'])
        deforestation_mask = ndvi_2018.subtract(ndvi).gt(0.25).And(lc.eq(10))
        nbr_curr = s2.normalizedDifference(['B8', 'B12']).rename('NBR')
        burn_mask = nbr_curr.lt(-0.1)

        def get_actual_ha(mask):
            try:
                area_res = mask.multiply(ee.Image.pixelArea()).reduceRegion(
                    reducer=ee.Reducer.sum(), geometry=aoi, scale=20, maxPixels=1e9
                ).getInfo()
                return round(float(list(area_res.values())[0]) / 10000, 2) if area_res else 0.0
            except: return 0.0

        total_ha = to_ha(total_px)

        return {
            "status": "success",
            "results": {
                "total_area_ha": total_ha,
                "eligibility": {"percentage": round(suitability_pct, 1)},
                "model_prediction": {"avg": avg_h, "max": max_h},
                "lulc": {
                    "cropland": to_ha(lc_stats.get('40', 0)), 
                    "grass": to_ha(lc_stats.get('30', 0)) + to_ha(lc_stats.get('20', 0)),
                    "bare": to_ha(lc_stats.get('60', 0)), 
                    "burn": get_actual_ha(burn_mask),
                    "trees": to_ha(lc_stats.get('10', 0)), 
                    "water": to_ha(lc_stats.get('80', 0)), 
                    "mangroves": to_ha(lc_stats.get('90', 0)) + to_ha(lc_stats.get('95', 0)),
                    "ice_snow": to_ha(lc_stats.get('70', 0)),
                    "urban": to_ha(lc_stats.get('50', 0)),
                    "clouds": 0, # Placeholder since WorldCover 10m does not output clouds
                    "defor": get_actual_ha(deforestation_mask)
                },
                "tiles": {
                    "trees": get_tile(10, "#e3ef71"), 
                    "mangroves": get_tile(95, "#d9812f"),
                    "water": get_tile(80, "#ef986e"),
                    "ice_snow": get_tile(70, "#b24fdb"),
                    "cropland": get_tile(40, "#a4fca1"),
                    "grass": get_tile(30, "#a4b5c4"), 
                    "bare": get_tile(60, "#4ca1df"),
                    "urban": get_tile(50, "#8a2be2"),
                    "burn_layer": burn_mask.updateMask(burn_mask).getMapId({'palette': ['#4ca1df']})['tile_fetcher'].url_format,
                    "defor_layer": deforestation_mask.updateMask(deforestation_mask).getMapId({'palette': ['#9133bd']})['tile_fetcher'].url_format
                }
            }
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}