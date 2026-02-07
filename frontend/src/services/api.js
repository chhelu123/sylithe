const API_BASE = 'http://localhost:8000';

export const analyzeLULC = async (aoi, startDate, endDate) => {
  const response = await fetch(`${API_BASE}/api/lulc/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      aoi,
      start_date: startDate,
      end_date: endDate
    })
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
};

export const analyzeTimeline = async (aoi, startYear, endYear) => {
  const response = await fetch(`${API_BASE}/api/lulc/timeline`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      aoi,
      start_year: startYear,
      end_year: endYear
    })
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
};

export const createBaseline = async (aoi, baselineYear) => {
  const response = await fetch(`${API_BASE}/api/baseline/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      aoi,
      baseline_year: baselineYear
    })
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
};

export const lockBaseline = async (baselineId, lockedBy = 'user') => {
  const response = await fetch(`${API_BASE}/api/baseline/lock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      baseline_id: baselineId,
      locked_by: lockedBy
    })
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
};

export const getBaseline = async (baselineId) => {
  const response = await fetch(`${API_BASE}/api/baseline/${baselineId}`);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
};

export const detectChanges = async (baselineId, currentYear, aoi) => {
  const response = await fetch(`${API_BASE}/api/change-detection`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      baseline_id: baselineId,
      current_year: currentYear,
      aoi
    })
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
};

export const assessRisk = async (baselineId, currentYear, aoi) => {
  const response = await fetch(`${API_BASE}/api/risk-assessment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      baseline_id: baselineId,
      current_year: currentYear,
      aoi
    })
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
};

export const analyzeLeakage = async (baselineId, currentYear, aoi) => {
  const response = await fetch(`${API_BASE}/api/leakage-analysis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      baseline_id: baselineId,
      current_year: currentYear,
      aoi
    })
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
};

export const analyzeDACB = async (aoi, baselineYear, currentYear, bufferKm = 5, useKnn = true) => {
  const response = await fetch(`${API_BASE}/api/dacb/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      aoi,
      baseline_year: baselineYear,
      current_year: currentYear,
      buffer_km: bufferKm,
      use_knn: useKnn
    })
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
};
