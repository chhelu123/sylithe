import ee
import numpy as np
from sklearn.neighbors import NearestNeighbors
from app.gee_service import geojson_to_ee

def generate_candidate_tiles(aoi_geojson, buffer_km=20, tile_size_km=1):
    """Generate candidate control area tiles around project AOI"""
    aoi = geojson_to_ee(aoi_geojson)
    
    # Create outer buffer
    buffer_meters = buffer_km * 1000
    outer_buffer = aoi.buffer(buffer_meters)
    
    # Get bounds
    bounds = outer_buffer.bounds()
    coords = bounds.coordinates().getInfo()[0]
    
    # Calculate grid
    min_lon, min_lat = coords[0]
    max_lon, max_lat = coords[2]
    
    tile_size_deg = tile_size_km / 111  # Approximate km to degrees
    
    tiles = []
    lat = min_lat
    tile_id = 0
    
    while lat < max_lat:
        lon = min_lon
        while lon < max_lon:
            # Create tile geometry
            tile = ee.Geometry.Rectangle([lon, lat, lon + tile_size_deg, lat + tile_size_deg])
            
            # Exclude if overlaps with project AOI
            if not tile.intersects(aoi).getInfo():
                tiles.append({
                    'id': f'tile_{tile_id}',
                    'geometry': tile
                })
                tile_id += 1
            
            lon += tile_size_deg
        lat += tile_size_deg
    
    return tiles[:100]  # Limit to 100 candidates for performance

def extract_features(geometry, baseline_year, current_year):
    """Extract feature vector from GEE for a geometry"""
    
    # Forest percentage at baseline
    dw_baseline = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1') \
        .filterDate(f'{baseline_year}-01-01', f'{baseline_year}-12-31') \
        .filterBounds(geometry) \
        .select('label') \
        .mode()
    
    forest_baseline = dw_baseline.eq(1)
    
    stats_baseline = forest_baseline.reduceRegion(
        reducer=ee.Reducer.mean(),
        geometry=geometry,
        scale=100,
        maxPixels=1e8
    )
    
    # Forest percentage at current
    dw_current = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1') \
        .filterDate(f'{current_year}-01-01', f'{current_year}-12-31') \
        .filterBounds(geometry) \
        .select('label') \
        .mode()
    
    forest_current = dw_current.eq(1)
    
    stats_current = forest_current.reduceRegion(
        reducer=ee.Reducer.mean(),
        geometry=geometry,
        scale=100,
        maxPixels=1e8
    )
    
    # Built-up area
    built_baseline = dw_baseline.eq(6)
    built_current = dw_current.eq(6)
    
    built_stats_baseline = built_baseline.reduceRegion(
        reducer=ee.Reducer.mean(),
        geometry=geometry,
        scale=100,
        maxPixels=1e8
    )
    
    built_stats_current = built_current.reduceRegion(
        reducer=ee.Reducer.mean(),
        geometry=geometry,
        scale=100,
        maxPixels=1e8
    )
    
    # Get values
    forest_pct_baseline = stats_baseline.getInfo().get('label', 0) * 100
    forest_pct_current = stats_current.getInfo().get('label', 0) * 100
    built_pct_baseline = built_stats_baseline.getInfo().get('label', 0) * 100
    built_pct_current = built_stats_current.getInfo().get('label', 0) * 100
    
    # Calculate rates
    years = current_year - baseline_year
    forest_loss_rate = (forest_pct_baseline - forest_pct_current) / years if years > 0 else 0
    built_growth_rate = (built_pct_current - built_pct_baseline) / years if years > 0 else 0
    
    return np.array([
        forest_pct_baseline,
        forest_loss_rate,
        built_growth_rate,
        abs(forest_pct_current - forest_pct_baseline)  # Volatility
    ])

def select_control_areas_knn(aoi_geojson, baseline_year, current_year, k=8, buffer_km=20):
    """Select K most similar control areas using KNN"""
    
    aoi = geojson_to_ee(aoi_geojson)
    
    # Extract project area features
    project_features = extract_features(aoi, baseline_year, current_year)
    
    # Generate candidate tiles
    candidates = generate_candidate_tiles(aoi_geojson, buffer_km)
    
    if len(candidates) < k:
        k = len(candidates)
    
    # Extract features for all candidates
    candidate_features = []
    valid_candidates = []
    
    for candidate in candidates:
        try:
            features = extract_features(candidate['geometry'], baseline_year, current_year)
            candidate_features.append(features)
            valid_candidates.append(candidate)
        except:
            continue  # Skip tiles with no data
    
    if len(candidate_features) < k:
        k = len(candidate_features)
    
    # Convert to numpy array
    X = np.array(candidate_features)
    
    # Fit KNN
    knn = NearestNeighbors(n_neighbors=k, metric='euclidean')
    knn.fit(X)
    
    # Find K nearest neighbors
    distances, indices = knn.kneighbors([project_features])
    
    # Select control areas
    selected_controls = []
    for idx, dist in zip(indices[0], distances[0]):
        selected_controls.append({
            'tile_id': valid_candidates[idx]['id'],
            'geometry': valid_candidates[idx]['geometry'],
            'similarity_score': float(1 / (1 + dist))  # Convert distance to similarity
        })
    
    # Merge selected tiles into single control area
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
