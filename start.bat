@echo off
echo ========================================
echo Starting Sylithe LULC Platform
echo ========================================
echo.

echo [1/2] Starting Backend (FastAPI)...
start cmd /k "cd backend && uvicorn app.main:app --reload --port 8000"

timeout /t 3 /nobreak > nul

echo [2/2] Starting Frontend (Vite + React)...
start cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo ========================================
echo.
echo Press any key to exit...
pause > nul
