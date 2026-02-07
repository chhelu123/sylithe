import ee
import pandas as pd
from services.gee_init import init_gee

init_gee()



def extract_chm_features(geojson, year):



    start = f"{year}-01-01"
    end   = f"{year}-12-31"

    geometry = geojson.get("geometry", geojson)
    aoi = ee.Geometry(geometry)

    s2 = (
        ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
        .filterBounds(aoi)
        .filterDate(start, end)
        .median()
        .divide(10000)
    )

    s1 = (
        ee.ImageCollection("COPERNICUS/S1_GRD")
        .filterBounds(aoi)
        .filterDate(start, end)
        .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV"))
        .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VH"))
        .median()
    )

    vv = s1.select("VV")
    vh = s1.select("VH")
    vv_vh = vv.subtract(vh).rename("VV_minus_VH_dB")

    ndvi = s2.normalizedDifference(["B8", "B4"]).rename("NDVI")

    feature_stack = ee.Image.cat([
        s2.select(["B2","B3","B4","B5","B6","B7","B8","B8A","B11","B12"]),
        vv, vh, vv_vh,
        ndvi,
        ee.Image("USGS/SRTMGL1_003").rename("elev"),
        ee.Terrain.slope(ee.Image("USGS/SRTMGL1_003")).rename("slope"),
        ee.Terrain.aspect(ee.Image("USGS/SRTMGL1_003")).rename("aspect"),
        ee.Image.pixelLonLat().rename(["lon","lat"])
    ]).clip(aoi)

    samples = feature_stack.sample(
        region=aoi,
        scale=10,
        numPixels=4000,
        geometries=False,
        tileScale=4
    ).getInfo()

    df = pd.DataFrame([f["properties"] for f in samples["features"]])

    return df, {"pixel_count": len(df)}
