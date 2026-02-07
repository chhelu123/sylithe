import ee
import numpy as np
from sklearn.neighbors import NearestNeighbors
from app.gee_service import geojson_to_ee

def generate_candidate_tiles(aoi_geojson, buffer_km=10, tile_size_km=2):
    """Generate candidate tiles - OPTIMIZED: larger tiles, smaller buffer"""
    aoi = geojson_to_ee(aoi_geojson)
    
    buffer_meters = buffer_km * 1000
    outer_buffer = aoi.buffer(buffer_meters)
    
    bounds = outer_buffer.bounds()
    coords = bounds.coordinates().getInfo()[0]
    
    min_lon, min_lat = coords[0]
    max_lon, max_lat = coords[2]
    
    tile_size_deg = tile_size_km / 111
    
    tiles = []
    lat = min_lat
    tile_id = 0
    
    while lat < max_lat:
        lon = min_lon
        while lon < max_lon:
            tile = ee.Geometry.Rectangle([lon, lat, lon + tile_size_deg, lat + tile_size_deg])
            
            if not tile.intersects(aoi).getInfo():
                tiles.append({
                    'id': f'tile_{tile_id}',
                    'geometry': tile
                })
                tile_id += 1
            
            lon += tile_size_deg
        lat += tile_size_deg
    
    return tiles[:25]  # OPTIMIZED: 25 tiles instead of 100

def extract_features_batch(geometries, baseline_year, current_year):
    """OPTIMIZED: Extract features for multiple geometries in one call"""
    
    # Create feature collection from geometries
    features = [ee.Feature(g['geometry']) for g in geometries]
    fc = ee.FeatureCollection(features)
    
    # Load images once
    dw_baseline = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1') \
        .filterDate(f'{baseline_year}-01-01', f'{baseline_year}-12-31') \
        .select('label') \
        .mode()
    
    dw_current = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1') \
        .filterDate(f'{current_year}-01-01', f'{current_year}-12-31') \
        .select('label') \
        .mode()
    
    # Compute forest and built-up for all tiles at once
    def compute_stats(feature):
        geom = feature.geometry()
        
        forest_base = dw_baseline.eq(1).reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=geom,
            scale=200,  # OPTIMIZED: 200m instead of 100m
            maxPixels=1e7
        ).get('label')
        
        forest_curr = dw_current.eq(1).reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=geom,
            scale=200,
            maxPixels=1e7
        ).get('label')
        
        built_base = dw_baseline.eq(6).reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=geom,
            scale=200,
            maxPixels=1e7
        ).get('label')
        
        built_curr = dw_current.eq(6).reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=geom,
            scale=200,
            maxPixels=1e7
        ).get('label')
        
        return feature.set({
            'forest_base': forest_base,
            'forest_curr': forest_curr,
            'built_base': built_base,
            'built_curr': built_curr
        })
    
    # Process all at once
    results = fc.map(compute_stats).getInfo()
    
    # Convert to feature vectors
    years = current_year - baseline_year
    feature_vectors = []
    
    for feat in results['features']:
        props = feat['properties']
        fb = props.get('forest_base', 0) * 100
        fc = props.get('forest_curr', 0) * 100
        bb = props.get('built_base', 0) * 100
        bc = props.get('built_curr', 0) * 100
        
        forest_loss_rate = (fb - fc) / years if years > 0 else 0
        built_growth_rate = (bc - bb) / years if years > 0 else 0
        
        feature_vectors.append([
            fb,
            forest_loss_rate,
            built_growth_rate,
            abs(fc - fb)
        ])
    
    return np.array(feature_vectors)

def select_control_areas_knn(aoi_geojson, baseline_year, current_year, k=5, buffer_km=10):
    """OPTIMIZED: Select K most similar control areas using KNN"""
    
    aoi = geojson_to_ee(aoi_geojson)
    
    # Generate fewer, larger tiles
    candidates = generate_candidate_tiles(aoi_geojson, buffer_km, tile_size_km=2)
    
    if len(candidates) < k:
        k = max(1, len(candidates))
    
    # Add project area to batch
    all_geoms = [{'geometry': aoi}] + candidates
    
    # Extract features for all in one batch
    all_features = extract_features_batch(all_geoms, baseline_year, current_year)
    
    # Split project and candidates
    project_features = all_features[0]
    candidate_features = all_features[1:]
    
    # KNN selection
    knn = NearestNeighbors(n_neighbors=k, metric='euclidean')
    knn.fit(candidate_features)
    
    distances, indices = knn.kneighbors([project_features])
    
    # Select control areas
    selected_controls = []
    for idx, dist in zip(indices[0], distances[0]):
        selected_controls.append({
            'tile_id': candidates[idx]['id'],
            'geometry': candidates[idx]['geometry'],
            'similarity_score': float(1 / (1 + dist))
        })
    
    # Merge selected tiles
    control_geometries = [c['geometry'] for c in selected_controls]
    merged_control = ee.Geometry.MultiPolygon([g.coordinates() for g in control_geometries])
    
    return {
        'control_geometry': merged_control,
        'control_geojson': {
            'type': 'Feature',
            'geometry': merged_control.getInfo()
        },
        'selected_tiles': selected_controls,
        'k_value': k,
        'selection_method': 'KNN',
        'features_used': ['forest_pct_baseline', 'forest_loss_rate', 'built_growth_rate', 'volatility'],
        'distance_metric': 'euclidean'
    }
