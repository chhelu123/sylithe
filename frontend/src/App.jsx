import { useState } from 'react';
import Navbar from './components/Navbar';
import MetricCard from './components/MetricCard';
import Map from './components/Map';
import StatsPanel from './components/StatsPanel';
import BaselinePanel from './components/BaselinePanel';
import ChangeDetectionPanel from './components/ChangeDetectionPanel';
import RiskAssessmentPanel from './components/RiskAssessmentPanel';
import LeakagePanel from './components/LeakagePanel';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import DACBPanel from './components/DACBPanel';
import { analyzeLULC, analyzeTimeline, createBaseline, lockBaseline, detectChanges, assessRisk, analyzeLeakage, analyzeDACB } from './services/api';
import './App.css';

function App() {
  const [tileUrl, setTileUrl] = useState(null);
  const [stats, setStats] = useState(null);
  const [area, setArea] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentAoi, setCurrentAoi] = useState(null);
  const [baseline, setBaseline] = useState(null);
  const [changeData, setChangeData] = useState(null);
  const [riskData, setRiskData] = useState(null);
  const [leakageData, setLeakageData] = useState(null);
  const [dacbData, setDacbData] = useState(null);
  const [bufferTileUrl, setBufferTileUrl] = useState(null);
  const [activeTab, setActiveTab] = useState('stats');
  const [baselineYear, setBaselineYear] = useState(2019);
  const [compareYear, setCompareYear] = useState(2023);

  const handlePolygonDrawn = async (geojson) => {
    setCurrentAoi(geojson);
    await analyzeSingleYear(geojson, 2023);
  };

  const analyzeSingleYear = async (geojson, year) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await analyzeLULC(geojson, `${year}-01-01`, `${year}-12-31`);
      setTileUrl(result.tile_url);
      setStats(result.stats);
      setArea(result.aoi_area_km2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBaseline = async () => {
    if (!currentAoi) {
      setError('Please draw a polygon first');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await createBaseline(currentAoi, baselineYear);
      setBaseline(result);
      setTileUrl(result.tile_url);
      setStats(result.stats);
      setArea(result.area_km2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!baseline) {
      setError('Please create a baseline first');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await detectChanges(baseline.baseline_id, compareYear, currentAoi);
      setChangeData(result);
      setTileUrl(result.current_tile_url);
      
      const riskResult = await assessRisk(baseline.baseline_id, compareYear, currentAoi);
      setRiskData(riskResult);
      
      const leakageResult = await analyzeLeakage(baseline.baseline_id, compareYear, currentAoi);
      setLeakageData(leakageResult);
      setBufferTileUrl(leakageResult.buffer_tile_url);
      
      const dacbResult = await analyzeDACB(currentAoi, baseline.baseline_year, compareYear, 5, false);
      setDacbData(dacbResult);
      
      setActiveTab('analytics');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="dashboard-main">
        <div className="map-section">
          <Map onPolygonDrawn={handlePolygonDrawn} tileUrl={tileUrl} bufferTileUrl={bufferTileUrl} />
        </div>
        
        <div className="analytics-panel">
          {/* Metrics Grid */}
          <div className="metrics-grid">
            <MetricCard 
              icon="🌲" 
              label="Forest Area" 
              value={area ? area.toFixed(2) : '—'} 
              unit="km²"
            />
            <MetricCard 
              icon="⚡" 
              label="Risk Level" 
              value={riskData ? riskData.risk_level : '—'}
            />
            <MetricCard 
              icon="✓" 
              label="Status" 
              value={baseline ? 'Active' : 'Setup'}
            />
          </div>

          {/* Controls */}
          <div className="controls-section">
            <div className="controls-title">🎯 Analysis Controls</div>
            <div className="controls-grid">
              <div className="control-group">
                <label className="control-label">Baseline Year</label>
                <select 
                  className="control-input"
                  value={baselineYear}
                  onChange={(e) => setBaselineYear(parseInt(e.target.value))}
                  disabled={loading || baseline}
                >
                  {[2018, 2019, 2020, 2021].map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              {!baseline && (
                <button 
                  className="control-button"
                  onClick={handleCreateBaseline}
                  disabled={loading || !currentAoi}
                >
                  {loading ? 'Creating...' : 'Create Baseline'}
                </button>
              )}

              {baseline && (
                <>
                  <div className="control-group">
                    <label className="control-label">Compare Year</label>
                    <select 
                      className="control-input"
                      value={compareYear}
                      onChange={(e) => setCompareYear(parseInt(e.target.value))}
                      disabled={loading}
                    >
                      {[2020, 2021, 2022, 2023].filter(y => y > baseline.baseline_year).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  
                  <button 
                    className="control-button"
                    onClick={handleAnalyze}
                    disabled={loading}
                  >
                    {loading ? 'Analyzing...' : '▶ Run Analysis'}
                  </button>
                </>
              )}
            </div>
          </div>

          {loading && (
            <div className="status loading">
              <div className="spinner"></div>
              <span>Analyzing...</span>
            </div>
          )}
          
          {error && (
            <div className="status error">
              Error: {error}
            </div>
          )}

          {/* Results */}
          {changeData && (
            <div className="results-section">
              <div className="results-tabs">
                <button 
                  className={`results-tab ${activeTab === 'analytics' ? 'active' : ''}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  📊 Analytics
                </button>
                <button 
                  className={`results-tab ${activeTab === 'stats' ? 'active' : ''}`}
                  onClick={() => setActiveTab('stats')}
                >
                  📈 Stats
                </button>
                <button 
                  className={`results-tab ${activeTab === 'changes' ? 'active' : ''}`}
                  onClick={() => setActiveTab('changes')}
                >
                  🔄 Changes
                </button>
                <button 
                  className={`results-tab ${activeTab === 'risk' ? 'active' : ''}`}
                  onClick={() => setActiveTab('risk')}
                >
                  ⚠️ Risk
                </button>
                <button 
                  className={`results-tab ${activeTab === 'leakage' ? 'active' : ''}`}
                  onClick={() => setActiveTab('leakage')}
                >
                  🔍 Leakage
                </button>
                <button 
                  className={`results-tab ${activeTab === 'dacb' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dacb')}
                >
                  🎯 DACB
                </button>
              </div>

              <div className="results-content">
                {activeTab === 'analytics' && <AnalyticsDashboard dacbData={dacbData} changeData={changeData} riskData={riskData} leakageData={leakageData} baseline={baseline} />}
                {activeTab === 'stats' && <StatsPanel stats={stats} area={area} />}
                {activeTab === 'changes' && <ChangeDetectionPanel changeData={changeData} />}
                {activeTab === 'risk' && <RiskAssessmentPanel riskData={riskData} />}
                {activeTab === 'leakage' && <LeakagePanel leakageData={leakageData} />}
                {activeTab === 'dacb' && <DACBPanel dacbData={dacbData} />}
              </div>
            </div>
          )}

          {!changeData && !loading && currentAoi && (
            <div className="empty-state">
              <div className="empty-state-icon">📈</div>
              <div className="empty-state-title">Ready to Analyze</div>
              <div className="empty-state-text">
                {!baseline ? 'Create a baseline to start carbon analysis' : 'Select a comparison year and run analysis'}
              </div>
            </div>
          )}

          {!currentAoi && !loading && (
            <div className="empty-state">
              <div className="empty-state-icon">🗺️</div>
              <div className="empty-state-title">Draw Your Project Area</div>
              <div className="empty-state-text">
                Use the drawing tools on the map to define your area of interest
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
