import joblib
import numpy as np
import pandas as pd

from services.gee_feature_extraction import extract_chm_features

# -------------------------------------------------
# Load trained model
# -------------------------------------------------
model = joblib.load("models/Sylithe_BayesOpt_Model.pkl")

# -------------------------------------------------
# EXACT feature list used during training
# -------------------------------------------------
CHM_MODEL_FEATURES = [
    "ALOS_HH","ALOS_HV",
    "B11","B12","B2","B3","B4","B5","B6","B7","B8","B8A",
    "CHIRPS_PRECIP","ERA5_TEMP","EVI",
    "GLCM_contrast","GLCM_correlation","GLCM_entropy",
    "MSAVI","NBR","NDMI","NDRE","NDVI",
    "NDVI_max","NDVI_mean","NDVI_min","NDVI_std",
    "SAVI","SOLAR_RAD","TPI",
    "VH","VV","VV_minus_VH_dB",
    "aspect","elev","landcover","lat","lon","slope",
    "Radar_Volume","Texture_Index"
]

# -------------------------------------------------
# MAIN INFERENCE FUNCTION
# -------------------------------------------------
def run_chm_inference(geojson, year):
    # -------------------------------------------------
    # 1. Extract features from GEE (YEAR-AWARE)
    # -------------------------------------------------
    df, stats = extract_chm_features(geojson, year)

    if df.empty:
        return {
            "status": "error",
            "message": "No valid pixels found for this AOI/year."
        }

    # -------------------------------------------------
    # 2. PHYSICS FEATURES
    # -------------------------------------------------
    df["Radar_Volume"] = (
        df["VH"] * df["NDVI"]
        if "VH" in df.columns and "NDVI" in df.columns
        else 0.0
    )

    df["Texture_Index"] = (
        df["GLCM_contrast"] / (df["GLCM_entropy"] + 0.1)
        if "GLCM_contrast" in df.columns and "GLCM_entropy" in df.columns
        else 0.0
    )

    # -------------------------------------------------
    # 3. REMOVE NON-TRAINED FIELDS
    # -------------------------------------------------
    if "Eco_Zone" in df.columns:
        df = df.drop(columns=["Eco_Zone"])

    # -------------------------------------------------
    # 4. ENSURE ALL TRAINING FEATURES EXIST
    # -------------------------------------------------
    for col in CHM_MODEL_FEATURES:
        if col not in df.columns:
            df[col] = 0.0

    # -------------------------------------------------
    # 5. ORDER FEATURES EXACTLY
    # -------------------------------------------------
    X = df[CHM_MODEL_FEATURES].fillna(0)

    # -------------------------------------------------
    # 6. MODEL PREDICTION (log → meters)
    # -------------------------------------------------
    preds_log = model.predict(X)
    preds_m = np.expm1(preds_log)

    # -------------------------------------------------
    # 7. OUTPUT
    # -------------------------------------------------
    return {
        "status": "success",
        "results": {
            "model_prediction": {
                "min": float(np.min(preds_m)),
                "avg": float(np.mean(preds_m)),
                "max": float(np.max(preds_m))
            },
            "pixel_count": stats.get("pixel_count", len(df)),
            "year": year
        }
    }




