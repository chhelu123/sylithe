# Testing Guide

## Quick Test Locations

### 1. Mumbai, India (Urban + Water)
```json
{
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[72.8, 19.0], [72.9, 19.0], [72.9, 19.1], [72.8, 19.1], [72.8, 19.0]]]
  }
}
```
Expected: Built area, water, some vegetation

### 2. Amazon Rainforest, Brazil (Dense Forest)
```json
{
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[-60.0, -3.0], [-59.9, -3.0], [-59.9, -2.9], [-60.0, -2.9], [-60.0, -3.0]]]
  }
}
```
Expected: Mostly trees

### 3. Sahara Desert, Africa (Bare Ground)
```json
{
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[10.0, 25.0], [10.1, 25.0], [10.1, 25.1], [10.0, 25.1], [10.0, 25.0]]]
  }
}
```
Expected: Mostly bare ground

### 4. Iowa, USA (Agricultural)
```json
{
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[-93.5, 42.0], [-93.4, 42.0], [-93.4, 42.1], [-93.5, 42.1], [-93.5, 42.0]]]
  }
}
```
Expected: Crops, grass

## Testing with cURL

### Test Backend Health
```bash
curl http://localhost:8000/api/health
```

Expected: `{"status":"ok"}`

### Test LULC Analysis
```bash
curl -X POST http://localhost:8000/api/lulc/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "aoi": {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[72.8,19.0],[72.9,19.0],[72.9,19.1],[72.8,19.1],[72.8,19.0]]]
      }
    },
    "start_date": "2023-01-01",
    "end_date": "2023-12-31"
  }'
```

## Testing Checklist

### Backend Tests
- [ ] Health endpoint returns 200
- [ ] LULC analysis accepts valid GeoJSON
- [ ] Returns tile_url in response
- [ ] Returns stats object
- [ ] Caching works (second request is faster)
- [ ] Large AOI is rejected (>10,000 km²)
- [ ] Invalid GeoJSON returns error

### Frontend Tests
- [ ] Map loads correctly
- [ ] Drawing tools appear
- [ ] Can draw polygon
- [ ] Can draw rectangle
- [ ] Loading indicator shows during analysis
- [ ] LULC tiles render on map
- [ ] Statistics panel populates
- [ ] Error messages display correctly
- [ ] Can delete and redraw polygon

### Integration Tests
- [ ] Frontend can reach backend
- [ ] CORS allows requests
- [ ] Tile URLs are accessible
- [ ] Statistics match tile visualization

## Performance Benchmarks

| AOI Size | Expected Response Time |
|----------|----------------------|
| Small (< 100 km²) | 2-5 seconds |
| Medium (100-1000 km²) | 5-15 seconds |
| Large (1000-10000 km²) | 15-60 seconds |

## Common Issues

### Issue: "CORS error"
**Solution:** Check backend CORS_ORIGINS in .env matches frontend URL

### Issue: "GEE not initialized"
**Solution:** Verify service account credentials are correct

### Issue: "Tiles not loading"
**Solution:** Check browser console, verify tile_url is returned

### Issue: "Analysis takes too long"
**Solution:** Reduce AOI size or date range

## Database Inspection

Check cached results:
```bash
sqlite3 backend/sylithe.db "SELECT * FROM cache;"
```

Check request logs:
```bash
sqlite3 backend/sylithe.db "SELECT * FROM requests ORDER BY created_at DESC LIMIT 10;"
```

## Automated Testing (Future)

### Backend Unit Tests (pytest)
```python
def test_geojson_to_ee():
    # Test GeoJSON conversion
    pass

def test_lulc_generation():
    # Test LULC generation
    pass
```

### Frontend Tests (Vitest)
```javascript
test('Map renders', () => {
  // Test map component
});

test('API call succeeds', () => {
  // Test API integration
});
```

## Load Testing

Use Apache Bench to test concurrent requests:
```bash
ab -n 100 -c 10 -T application/json -p test_payload.json http://localhost:8000/api/lulc/analyze
```

## Monitoring

Watch backend logs:
```bash
tail -f backend/logs/app.log
```

Monitor database size:
```bash
du -h backend/sylithe.db
```

---

**Always test with small AOIs first to verify setup before scaling up!**
