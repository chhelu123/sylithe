import ee
import os
from dotenv import load_dotenv

load_dotenv()

def init_gee():
    """Initialize Google Earth Engine with service account"""
    try:
        service_account = os.getenv("GEE_SERVICE_ACCOUNT")
        key_path = os.getenv("GEE_PRIVATE_KEY_PATH")
        
        if service_account and key_path and os.path.exists(key_path):
            credentials = ee.ServiceAccountCredentials(service_account, key_path)
            ee.Initialize(credentials)
        else:
            ee.Initialize()
    except Exception as e:
        print(f"GEE initialization error: {e}")
        raise

def geojson_to_ee(aoi_geojson: dict):
    """Convert GeoJSON to Earth Engine Geometry"""
    coords = aoi_geojson["geometry"]["coordinates"]
    return ee.Geometry.Polygon(coords)

def generate_lulc(aoi_geojson: dict, start_date: str, end_date: str):
    """Generate LULC map using Dynamic World dataset"""
    aoi = geojson_to_ee(aoi_geojson)
    
    # Dynamic World LULC dataset from Google Earth Engine
    # cspell:disable-next-line
    dw = (
        ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1")
        .filterBounds(aoi)
        .filterDate(start_date, end_date)
    )
    
    lulc = dw.select("label").mode().clip(aoi)
    
    # Generate tile URL
    map_id = lulc.getMapId({
        "min": 0,
        "max": 8,
        "palette": [
            "#419BDF", "#397D49", "#88B053", "#7A87C6",
            "#E49635", "#DFC35A", "#C4281B", "#A59B8F", "#B39FE1"
        ]
    })
    
    # Calculate statistics
    stats = lulc.reduceRegion(
        reducer=ee.Reducer.frequencyHistogram(),
        geometry=aoi,
        scale=10,
        maxPixels=1e9
    ).getInfo()
    
    # Calculate area
    area_m2 = aoi.area().getInfo()
    area_km2 = area_m2 / 1e6
    
    return {
        "tile_url": map_id["tile_fetcher"].url_format,
        "stats": stats.get("label", {}),
        "area_km2": area_km2
    }
