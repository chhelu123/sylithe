# Google Earth Engine Setup Guide

## Prerequisites

1. Google Cloud Account
2. Google Earth Engine access (sign up at https://earthengine.google.com)

## Step-by-Step Setup

### 1. Create Google Cloud Project

1. Go to https://console.cloud.google.com
2. Create a new project (e.g., "sylithe-lulc")
3. Note the Project ID

### 2. Enable Earth Engine API

1. In Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Earth Engine API"
3. Click "Enable"

### 3. Create Service Account

1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Name: `sylithe-gee-service`
4. Grant role: "Earth Engine Resource Admin"
5. Click "Done"

### 4. Generate Service Account Key

1. Click on the created service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the JSON file
6. Save it securely (e.g., `backend/gee-credentials.json`)

### 5. Register Service Account with Earth Engine

Run this command (one-time setup):

```bash
earthengine authenticate --service-account your-service-account@your-project.iam.gserviceaccount.com --key-file path/to/key.json
```

### 6. Configure Backend

1. Copy `backend/.env.example` to `backend/.env`
2. Update values:

```env
GEE_SERVICE_ACCOUNT=your-service-account@your-project.iam.gserviceaccount.com
GEE_PRIVATE_KEY_PATH=./gee-credentials.json
CORS_ORIGINS=http://localhost:5173
MAX_AOI_AREA_KM2=10000
```

### 7. Test Connection

Run the backend:
```bash
cd backend
uvicorn app.main:app --reload
```

Visit: http://localhost:8000/api/health

If you see `{"status": "ok"}`, you're ready!

## Troubleshooting

**Error: "Earth Engine not initialized"**
- Verify service account has Earth Engine access
- Check JSON key file path is correct

**Error: "Permission denied"**
- Ensure service account has "Earth Engine Resource Admin" role
- Wait 5-10 minutes after creating service account

**Error: "Quota exceeded"**
- Earth Engine has usage limits
- Consider upgrading to commercial license for production

## Security Notes

⚠️ **NEVER commit the service account JSON key to Git**  
⚠️ **Keep .env file private**  
⚠️ **Use different credentials for dev/staging/production**

## Production Deployment

For production:
1. Use Google Cloud Secret Manager for credentials
2. Enable Cloud Logging
3. Set up monitoring and alerts
4. Configure auto-scaling
5. Use Cloud SQL instead of SQLite
