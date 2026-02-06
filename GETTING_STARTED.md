# Getting Started Checklist

## ✅ Pre-Setup (One-Time)

### 1. System Requirements
- [ ] Python 3.8+ installed
- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Git installed (optional)
- [ ] Google Cloud account created
- [ ] Google Earth Engine access requested

### 2. Google Earth Engine Setup
- [ ] Create Google Cloud Project
- [ ] Enable Earth Engine API
- [ ] Create Service Account
- [ ] Download service account JSON key
- [ ] Save key file to `backend/gee-credentials.json`
- [ ] Register service account with Earth Engine

📖 **Detailed instructions:** See `GEE_SETUP.md`

---

## 🚀 First Time Setup

### Backend Setup
```bash
cd backend
```

- [ ] Install Python dependencies
  ```bash
  pip install -r requirements.txt
  ```

- [ ] Create `.env` file
  ```bash
  copy .env.example .env
  ```

- [ ] Edit `.env` with your credentials
  - [ ] Set `GEE_SERVICE_ACCOUNT`
  - [ ] Set `GEE_PRIVATE_KEY_PATH`
  - [ ] Verify `CORS_ORIGINS=http://localhost:5173`

- [ ] Test backend startup
  ```bash
  uvicorn app.main:app --reload --port 8000
  ```

- [ ] Verify health endpoint
  - Open browser: http://localhost:8000/api/health
  - Should see: `{"status":"ok"}`

- [ ] Check API docs
  - Open browser: http://localhost:8000/docs

### Frontend Setup
```bash
cd frontend
```

- [ ] Install npm dependencies
  ```bash
  npm install
  ```

- [ ] Test frontend startup
  ```bash
  npm run dev
  ```

- [ ] Verify frontend loads
  - Open browser: http://localhost:5173
  - Should see map interface

---

## 🧪 Testing

### Quick Smoke Test
- [ ] Backend is running (port 8000)
- [ ] Frontend is running (port 5173)
- [ ] Map loads in browser
- [ ] Drawing tools appear on map
- [ ] Can draw a polygon
- [ ] Click polygon tool and draw on map
- [ ] Wait for analysis to complete
- [ ] LULC tiles appear on map
- [ ] Statistics panel shows data

### Test with Sample Location
- [ ] Draw polygon over Mumbai, India (19°N, 72°E)
- [ ] Should see mix of built area, water, vegetation
- [ ] Statistics panel should populate
- [ ] Response time < 10 seconds

---

## 🐛 Troubleshooting

### Backend Issues

**"Module not found" error**
```bash
pip install -r requirements.txt --upgrade
```

**"Earth Engine not initialized"**
- [ ] Check `.env` file exists
- [ ] Verify service account email is correct
- [ ] Verify JSON key file path is correct
- [ ] Ensure service account has Earth Engine access

**"Permission denied"**
- [ ] Wait 5-10 minutes after creating service account
- [ ] Verify service account has "Earth Engine Resource Admin" role

### Frontend Issues

**"npm install" fails**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Map doesn't load**
- [ ] Check browser console for errors
- [ ] Verify Leaflet CSS is imported
- [ ] Check network tab for failed requests

**"CORS error"**
- [ ] Verify backend `.env` has correct CORS_ORIGINS
- [ ] Restart backend after changing .env
- [ ] Check frontend is running on port 5173

### Integration Issues

**Tiles don't appear**
- [ ] Check browser console for errors
- [ ] Verify backend returned tile_url in response
- [ ] Check network tab for tile requests
- [ ] Try smaller polygon

**Analysis takes too long**
- [ ] Reduce polygon size
- [ ] Reduce date range
- [ ] Check GEE quota limits

---

## 📊 Verification Checklist

### Backend Verification
- [ ] Health endpoint responds: `GET /api/health`
- [ ] API docs accessible: http://localhost:8000/docs
- [ ] Database file created: `backend/sylithe.db`
- [ ] No errors in terminal

### Frontend Verification
- [ ] Page loads without errors
- [ ] Map renders correctly
- [ ] Drawing tools visible
- [ ] No console errors

### Integration Verification
- [ ] Can draw polygon
- [ ] Loading indicator appears
- [ ] Tiles render on map
- [ ] Statistics panel populates
- [ ] Second request is faster (cache working)

---

## 🎯 Next Steps After Setup

### Immediate
- [ ] Test with different locations (see `TESTING.md`)
- [ ] Experiment with date ranges
- [ ] Try different polygon sizes
- [ ] Check database for cached results

### Short Term
- [ ] Add user authentication
- [ ] Implement rate limiting
- [ ] Add more LULC datasets
- [ ] Export functionality (GeoTIFF)

### Long Term
- [ ] Deploy to production
- [ ] Set up monitoring
- [ ] Add admin dashboard
- [ ] Implement billing/quotas

---

## 📚 Documentation Reference

- `README.md` - Project overview
- `GEE_SETUP.md` - Google Earth Engine setup
- `TESTING.md` - Testing guide with sample data
- `ARCHITECTURE.md` - System architecture diagrams
- `PROJECT_SUMMARY.md` - Complete implementation details

---

## 🆘 Getting Help

### Check Logs
**Backend:**
```bash
# Terminal where backend is running
```

**Frontend:**
```bash
# Browser Developer Tools → Console
```

**Database:**
```bash
sqlite3 backend/sylithe.db "SELECT * FROM requests;"
```

### Common Commands

**Restart Backend:**
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

**Restart Frontend:**
```bash
cd frontend
npm run dev
```

**Clear Cache:**
```bash
rm backend/sylithe.db
```

**Check Python Version:**
```bash
python --version
```

**Check Node Version:**
```bash
node --version
```

---

## ✨ Success Criteria

You're ready to go when:
- ✅ Both servers start without errors
- ✅ You can draw a polygon on the map
- ✅ LULC tiles appear within 10 seconds
- ✅ Statistics panel shows land use breakdown
- ✅ Second request for same area is instant (cached)

---

**🎉 Congratulations! Your Sylithe LULC platform is ready!**
