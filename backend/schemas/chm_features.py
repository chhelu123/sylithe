# schemas/chm_features.py

CHM_MODEL_FEATURES = [
    # Sentinel-2
    "B2","B3","B4","B5","B6","B7","B8","B8A","B11","B12",

    # Sentinel-1
    "VV","VH","VV_minus_VH_dB",

    # Vegetation indices
    "NDVI","NDVI_min","NDVI_mean","NDVI_max","NDVI_std",
    "EVI","MSAVI","SAVI","NDMI","NDRE","NBR",

    # Terrain
    "elev","slope","aspect",

    # Spatial
    "lat","lon",

    # Physics (TRAINED FEATURES)
    "Radar_Volume",
    "Eco_Zone"
]
