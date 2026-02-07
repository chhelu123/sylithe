import ee
from app.gee_service import geojson_to_ee, generate_lulc
from app.knn_service import select_control_areas_knn
import numpy as np

def generate_buffer(aoi_geojson, buffer_km=5):
    """Generate buffer zone around AOI"""
    aoi = geojson_to_ee(aoi_geojson)
    buffer_meters = buffer_km * 1000
    buffer = aoi.buffer(buffer_meters).difference(aoi)
    
    buffer_geojson = {
        "type": "Feature",
        "geometry": buffer.getInfo()
    }
    
    return buffer_geojson

def extract_forest_area(stats, total_area_km2):
    """Extract forest area from LULC stats (Class 1 = Trees)"""
    total_pixels = sum(stats.values())
    tree_pixels = stats.get("1", 0)
    
    if total_pixels == 0:
        return 0.0
    
    forest_pct = tree_pixels / total_pixels
    forest_km2 = total_area_km2 * forest_pct
    
    return forest_km2

def calculate_control_trend(control_stats_t0, control_area_t0, control_stats_tn, control_area_tn, years):
    """Calculate annual forest loss rate in control area"""
    F_c_t0 = extract_forest_area(control_stats_t0, control_area_t0)
    F_c_tn = extract_forest_area(control_stats_tn, control_area_tn)
    
    r_c = (F_c_t0 - F_c_tn) / years
    
    return r_c, F_c_t0, F_c_tn

def dynamic_baseline(F_p_t0, control_trend, years):
    """Calculate expected forest area at current year"""
    F_hat_p_tn = F_p_t0 - control_trend * years
    return max(F_hat_p_tn, 0)

def calculate_avoided_deforestation(F_hat_p_tn, F_p_obs_tn):
    """Calculate avoided deforestation"""
    AD = F_hat_p_tn - F_p_obs_tn
    return max(AD, 0)

def apply_leakage_adjustment(AD, leakage_ratio):
    """Apply leakage discount factor"""
    if leakage_ratio < 0.8:
        lambda_factor = 1.00
        severity = "LOW"
    elif leakage_ratio <= 1.5:
        lambda_factor = 0.75
        severity = "MEDIUM"
    else:
        lambda_factor = 0.50
        severity = "HIGH"
    
    AD_adj = AD * lambda_factor
    
    return AD_adj, lambda_factor, severity

def calculate_permanence_score(F_p_t0, F_p_obs_tn, leakage_ratio):
    """Calculate permanence confidence (0-100)"""
    forest_change = abs(F_p_t0 - F_p_obs_tn)
    FSI = 1 - (forest_change / F_p_t0) if F_p_t0 > 0 else 0
    FSI = max(0, min(FSI, 1))
    
    L_norm = min(leakage_ratio / 2, 1)
    PCS = 100 * FSI * (1 - L_norm)
    
    return round(PCS, 1)

def control_area_quality_score(F_p_t0, A_p, F_c_t0, A_c):
    """Score similarity between PA and CA"""
    forest_pct_p = (F_p_t0 / A_p * 100) if A_p > 0 else 0
    forest_pct_c = (F_c_t0 / A_c * 100) if A_c > 0 else 0
    
    similarity = 1 - abs(forest_pct_p - forest_pct_c) / 100
    similarity = max(0, min(similarity, 1))
    
    quality = "HIGH" if similarity > 0.8 else "MEDIUM" if similarity > 0.6 else "LOW"
    
    return {
        "similarity_score": round(similarity, 2),
        "quality": quality,
        "project_forest_pct": round(forest_pct_p, 1),
        "control_forest_pct": round(forest_pct_c, 1)
    }

def dacb_analysis(aoi_geojson, baseline_year, current_year, buffer_km=5, use_knn=True):
    """Complete DACB analysis with optional KNN control selection"""
    
    years = current_year - baseline_year
    
    # Select control area
    if use_knn:
        knn_result = select_control_areas_knn(aoi_geojson, baseline_year, current_year, k=8, buffer_km=buffer_km*4)
        control_geojson = knn_result['control_geojson']
        control_metadata = {
            'method': 'KNN',
            'k_value': knn_result['k_value'],
            'features': knn_result['features_used'],
            'selected_tiles': [t['tile_id'] for t in knn_result['selected_tiles']],
            'avg_similarity': round(np.mean([t['similarity_score'] for t in knn_result['selected_tiles']]), 3)
        }
    else:
        control_geojson = generate_buffer(aoi_geojson, buffer_km)
        control_metadata = {'method': 'BUFFER', 'buffer_km': buffer_km}
    
    pa_baseline = generate_lulc(aoi_geojson, f"{baseline_year}-01-01", f"{baseline_year}-12-31")
    pa_current = generate_lulc(aoi_geojson, f"{current_year}-01-01", f"{current_year}-12-31")
    ca_baseline = generate_lulc(control_geojson, f"{baseline_year}-01-01", f"{baseline_year}-12-31")
    ca_current = generate_lulc(control_geojson, f"{current_year}-01-01", f"{current_year}-12-31")
    
    F_p_t0 = extract_forest_area(pa_baseline['stats'], pa_baseline['area_km2'])
    F_p_obs_tn = extract_forest_area(pa_current['stats'], pa_current['area_km2'])
    
    r_c, F_c_t0, F_c_tn = calculate_control_trend(
        ca_baseline['stats'], ca_baseline['area_km2'],
        ca_current['stats'], ca_current['area_km2'],
        years
    )
    
    F_hat_p_tn = dynamic_baseline(F_p_t0, r_c, years)
    AD = calculate_avoided_deforestation(F_hat_p_tn, F_p_obs_tn)
    
    project_loss = F_p_t0 - F_p_obs_tn
    control_loss = F_c_t0 - F_c_tn
    leakage_ratio = control_loss / (project_loss + 0.1) if project_loss != 0 else 0
    
    AD_adj, lambda_factor, leakage_severity = apply_leakage_adjustment(AD, leakage_ratio)
    PCS = calculate_permanence_score(F_p_t0, F_p_obs_tn, leakage_ratio)
    
    quality = control_area_quality_score(
        F_p_t0, pa_baseline['area_km2'],
        F_c_t0, ca_baseline['area_km2']
    )
    
    confidence = "HIGH" if PCS > 70 else "MEDIUM" if PCS > 50 else "LOW"
    
    return {
        "baseline_model": "Dynamic Area Control Baseline",
        "baseline_year": baseline_year,
        "current_year": current_year,
        "years_elapsed": years,
        "buffer_km": buffer_km,
        "project_tile_url": pa_current['tile_url'],
        "control_tile_url": ca_current['tile_url'],
        "control_geojson": control_geojson,
        "project_forest_baseline_km2": round(F_p_t0, 2),
        "project_forest_current_km2": round(F_p_obs_tn, 2),
        "control_forest_baseline_km2": round(F_c_t0, 2),
        "control_forest_current_km2": round(F_c_tn, 2),
        "control_trend_km2_per_year": round(r_c, 3),
        "expected_forest_km2": round(F_hat_p_tn, 2),
        "observed_forest_km2": round(F_p_obs_tn, 2),
        "avoided_deforestation_km2": round(AD, 2),
        "leakage_ratio": round(leakage_ratio, 2),
        "leakage_severity": leakage_severity,
        "leakage_adjustment_factor": lambda_factor,
        "adjusted_avoided_deforestation_km2": round(AD_adj, 2),
        "permanence_score": PCS,
        "control_area_quality": quality,
        "confidence": confidence,
        "control_selection": control_metadata
    }
