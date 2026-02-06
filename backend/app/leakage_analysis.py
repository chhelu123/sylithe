import ee

def geojson_to_ee(aoi_geojson: dict):
    """Convert GeoJSON to Earth Engine Geometry"""
    coords = aoi_geojson["geometry"]["coordinates"]
    return ee.Geometry.Polygon(coords)

def generate_buffer_zone(aoi_geojson, buffer_km=5):
    """Generate buffer zone around AOI (default 5km)"""
    aoi = geojson_to_ee(aoi_geojson)
    buffer_meters = buffer_km * 1000
    buffer = aoi.buffer(buffer_meters).difference(aoi)
    return buffer

def analyze_leakage(aoi_geojson, baseline_year, current_year, buffer_km=5):
    """Detect deforestation leakage in buffer zone vs project area"""
    try:
        aoi = geojson_to_ee(aoi_geojson)
        buffer = generate_buffer_zone(aoi_geojson, buffer_km)
        
        # Generate buffer visualization with outline
        buffer_outline = ee.Image().paint(buffer, 0, 3)  # 3px outline
        buffer_map = buffer_outline.getMapId({'palette': ['#FFA500']})
        buffer_tile_url = buffer_map['tile_fetcher'].url_format
        
        # Get forest cover for both zones
        def get_forest_stats(geometry, year):
            start = f"{year}-01-01"
            end = f"{year}-12-31"
            dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1').filterDate(start, end).filterBounds(geometry).select('label').mode()
            
            # Class 1 = Trees
            forest = dw.eq(1)
            stats = forest.reduceRegion(
                reducer=ee.Reducer.sum().combine(ee.Reducer.count(), '', True),
                geometry=geometry,
                scale=100,  # Increased scale for faster computation
                maxPixels=1e9,
                bestEffort=True
            )
            
            stats_info = stats.getInfo()
            forest_pixels = stats_info.get('label_sum', 0)
            total_pixels = stats_info.get('label_count', 1)
            forest_pct = (forest_pixels / total_pixels * 100) if total_pixels > 0 else 0
            area_km2 = total_pixels * 10000 / 1e6  # 100m pixels to km²
            
            return {"forest_pct": forest_pct, "area_km2": area_km2}
        
        # Analyze both zones
        aoi_baseline = get_forest_stats(aoi, baseline_year)
        aoi_current = get_forest_stats(aoi, current_year)
        buffer_baseline = get_forest_stats(buffer, baseline_year)
        buffer_current = get_forest_stats(buffer, current_year)
        
        # Calculate deforestation rates
        aoi_deforestation = aoi_baseline['forest_pct'] - aoi_current['forest_pct']
        buffer_deforestation = buffer_baseline['forest_pct'] - buffer_current['forest_pct']
        
        # Leakage detection logic
        leakage_detected = False
        leakage_severity = "NONE"
        leakage_ratio = 0
        
        if buffer_deforestation > 2:  # Significant buffer deforestation
            leakage_detected = True
            leakage_ratio = buffer_deforestation / max(abs(aoi_deforestation), 0.1)
            
            if leakage_ratio > 1.5:
                leakage_severity = "HIGH"
            elif leakage_ratio > 0.8:
                leakage_severity = "MEDIUM"
            else:
                leakage_severity = "LOW"
        
        # Generate summary
        if leakage_detected:
            summary = f"⚠️ Leakage detected: Buffer zone lost {buffer_deforestation:.1f}% forest cover while project area lost {aoi_deforestation:.1f}%. "
            summary += f"Leakage ratio: {leakage_ratio:.2f}x. This suggests deforestation pressure may be shifting outside the project boundary."
        else:
            summary = f"✅ No significant leakage detected. Buffer zone shows {buffer_deforestation:.1f}% forest loss vs {aoi_deforestation:.1f}% in project area."
        
        return {
            "leakage_detected": leakage_detected,
            "leakage_severity": leakage_severity,
            "leakage_ratio": round(leakage_ratio, 2),
            "buffer_km": buffer_km,
            "buffer_tile_url": buffer_tile_url,
            "project_area": {
                "baseline_forest_pct": round(aoi_baseline['forest_pct'], 2),
                "current_forest_pct": round(aoi_current['forest_pct'], 2),
                "deforestation_pct": round(aoi_deforestation, 2),
                "area_km2": round(aoi_baseline['area_km2'], 2)
            },
            "buffer_zone": {
                "baseline_forest_pct": round(buffer_baseline['forest_pct'], 2),
                "current_forest_pct": round(buffer_current['forest_pct'], 2),
                "deforestation_pct": round(buffer_deforestation, 2),
                "area_km2": round(buffer_baseline['area_km2'], 2)
            },
            "summary": summary,
            "recommendation": "Consider expanding monitoring to buffer zone" if leakage_detected else "Continue monitoring project area"
        }
    except Exception as e:
        # Return safe defaults if computation fails
        return {
            "leakage_detected": False,
            "leakage_severity": "UNKNOWN",
            "leakage_ratio": 0.0,
            "buffer_km": buffer_km,
            "buffer_tile_url": "",
            "project_area": {
                "baseline_forest_pct": 0.0,
                "current_forest_pct": 0.0,
                "deforestation_pct": 0.0,
                "area_km2": 0.0
            },
            "buffer_zone": {
                "baseline_forest_pct": 0.0,
                "current_forest_pct": 0.0,
                "deforestation_pct": 0.0,
                "area_km2": 0.0
            },
            "summary": f"⚠️ Leakage analysis failed: {str(e)}. Buffer zone may be too large for computation.",
            "recommendation": "Try a smaller AOI or contact support"
        }
