import { useState } from 'react';
import Map from './components/Map';
import StatsPanel from './components/StatsPanel';
import BaselinePanel from './components/BaselinePanel';
import ChangeDetectionPanel from './components/ChangeDetectionPanel';
import RiskAssessmentPanel from './components/RiskAssessmentPanel';
import LeakagePanel from './components/LeakagePanel';
import DACBPanel from './components/DACBPanel';
import { analyzeLULC, analyzeTimeline, createBaseline, lockBaseline, detectChanges, assessRisk, analyzeLeakage, analyzeDACB } from './services/api';
import './App.css';

function App() {
  const [tileUrl, setTileUrl] = useState(null);
  const [stats, setStats] = useState(null);
  const [area, setArea] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timelineMode, setTimelineMode] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [currentAoi, setCurrentAoi] = useState(null);
  const [baseline, setBaseline] = useState(null);
  const [changeData, setChangeData] = useState(null);
  const [riskData, setRiskData] = useState(null);
  const [leakageData, setLeakageData] = useState(null);
  const [bufferTileUrl, setBufferTileUrl] = useState(null);
  const [carbonMode, setCarbonMode] = useState(false);
  const [activeTab, setActiveTab] = useState('changes');
  const [dacbData, setDacbData] = useState(null);

  const handlePolygonDrawn = async (geojson) => {
    setCurrentAoi(geojson);
    
    if (timelineMode) {
      await loadTimeline(geojson);
    } else {
      await analyzeSingleYear(geojson, 2023);
    }
  };

  const analyzeSingleYear = async (geojson, year) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await analyzeLULC(
        geojson,
        `${year}-01-01`,
        `${year}-12-31`
      );
      
      setTileUrl(result.tile_url);
      setStats(result.stats);
      setArea(result.aoi_area_km2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTimeline = async (geojson) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await analyzeTimeline(geojson, 2018, 2023);
      setTimeline(result.timeline);
      setArea(result.aoi_area_km2);
      
      // Show most recent year by default
      const latestYear = result.timeline[result.timeline.length - 1];
      setSelectedYear(latestYear.year);
      setTileUrl(latestYear.tile_url);
      setStats(latestYear.stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    const yearData = timeline.find(t => t.year === parseInt(year));
    if (yearData) {
      setTileUrl(yearData.tile_url);
      setStats(yearData.stats);
    }
  };

  const toggleTimelineMode = () => {
    setTimelineMode(!timelineMode);
    if (currentAoi && !timelineMode) {
      loadTimeline(currentAoi);
    }
  };

  const handleCreateBaseline = async (year) => {
    if (!currentAoi) {
      setError('Please draw a polygon first');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await createBaseline(currentAoi, year);
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

  const handleLockBaseline = async (baselineId) => {
    setLoading(true);
    setError(null);
    
    try {
      await lockBaseline(baselineId);
      // Refresh baseline
      const result = await createBaseline(currentAoi, baseline.baseline_year);
      setBaseline(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDetectChanges = async (currentYear) => {
    if (!baseline) {
      setError('Please create a baseline first');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await detectChanges(baseline.baseline_id, currentYear, currentAoi);
      setChangeData(result);
      setTileUrl(result.current_tile_url);
      
      // Also run risk assessment
      const riskResult = await assessRisk(baseline.baseline_id, currentYear, currentAoi);
      setRiskData(riskResult);
      
      // Run leakage analysis
      const leakageResult = await analyzeLeakage(baseline.baseline_id, currentYear, currentAoi);
      setLeakageData(leakageResult);
      setBufferTileUrl(leakageResult.buffer_tile_url);
      
      // Run DACB analysis (KNN disabled by default for speed)
      const dacbResult = await analyzeDACB(currentAoi, baseline.baseline_year, currentYear, 5, false);
      setDacbData(dacbResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="header">
          <h1>Sylithe</h1>
          <p>Carbon Intelligence Platform</p>
        </div>
        
        <div className="sidebar-content">
          <div className="instructions">
            <h3>Quick Start</h3>
            <ol>
              <li>Draw polygon on map</li>
              <li>Select analysis mode</li>
              <li>View insights</li>
            </ol>
          </div>

          <div className="timeline-toggle">
            <button 
              onClick={() => setCarbonMode(!carbonMode)}
              style={{
                ...styles.modeBtn,
                ...(carbonMode ? styles.activeModeBtn : {})
              }}
            >
              {carbonMode ? 'Carbon Mode' : 'Analysis Mode'}
            </button>
          </div>

          {carbonMode && (
            <>
              <BaselinePanel 
                baseline={baseline}
                onCreateBaseline={handleCreateBaseline}
                onLockBaseline={handleLockBaseline}
                loading={loading}
              />
              
              {baseline && (
                <div style={styles.changeYearSelector}>
                  <label style={styles.label}>Compare with Year:</label>
                  <select 
                    onChange={(e) => handleDetectChanges(parseInt(e.target.value))}
                    style={styles.select}
                    disabled={loading}
                  >
                    <option value="">Select year...</option>
                    {[2020, 2021, 2022, 2023].filter(y => y > baseline.baseline_year).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              )}

              {changeData && (
                <div style={styles.tabContainer}>
                  <div style={styles.tabNav}>
                    <button 
                      onClick={() => setActiveTab('changes')} 
                      style={{...styles.tab, ...(activeTab === 'changes' ? styles.activeTab : {})}}
                    >
                      Changes
                    </button>
                    <button 
                      onClick={() => setActiveTab('risk')} 
                      style={{...styles.tab, ...(activeTab === 'risk' ? styles.activeTab : {})}}
                    >
                      Risk
                    </button>
                    <button 
                      onClick={() => setActiveTab('leakage')} 
                      style={{...styles.tab, ...(activeTab === 'leakage' ? styles.activeTab : {})}}
                    >
                      Leakage
                    </button>
                    <button 
                      onClick={() => setActiveTab('dacb')} 
                      style={{...styles.tab, ...(activeTab === 'dacb' ? styles.activeTab : {})}}
                    >
                      DACB
                    </button>
                  </div>

                  <div style={styles.tabContent}>
                    {activeTab === 'changes' && <ChangeDetectionPanel changeData={changeData} />}
                    {activeTab === 'risk' && <RiskAssessmentPanel riskData={riskData} />}
                    {activeTab === 'leakage' && <LeakagePanel leakageData={leakageData} />}
                    {activeTab === 'dacb' && <DACBPanel dacbData={dacbData} />}
                  </div>
                </div>
              )}
            </>
          )}

          {!carbonMode && (
            <>
              <div className="timeline-toggle">
                <button 
                  onClick={toggleTimelineMode}
                  style={{
                    ...styles.modeBtn,
                    ...(timelineMode ? styles.activeModeBtn : {})
                  }}
                >
                  {timelineMode ? 'Timeline Mode' : 'Single Year'}
                </button>
              </div>

              {timelineMode && timeline.length > 0 && (
                <div className="timeline-controls">
                  <h3>Timeline: {selectedYear}</h3>
                  <input
                    type="range"
                    min={2018}
                    max={2023}
                    value={selectedYear}
                    onChange={(e) => handleYearChange(e.target.value)}
                    style={styles.slider}
                  />
                  <div style={styles.yearLabels}>
                    <span>2018</span>
                    <span>2023</span>
                  </div>
                </div>
              )}

              <StatsPanel stats={stats} area={area} year={timelineMode ? selectedYear : null} />
            </>
          )}

          {loading && (
            <div className="status loading">
              <div className="spinner"></div>
              <span>{timelineMode ? 'Loading timeline...' : 'Analyzing LULC...'}</span>
            </div>
          )}
          
          {error && (
            <div className="status error">
              Error: {error}
            </div>
          )}
        </div>
      </div>
      
      <div className="map-container">
        <Map onPolygonDrawn={handlePolygonDrawn} tileUrl={tileUrl} bufferTileUrl={bufferTileUrl} />
      </div>
    </div>
  );
}

const styles = {
  modeBtn: {
    width: '100%',
    padding: '14px 20px',
    border: '1px solid rgba(132,204,22,0.3)',
    background: 'rgba(132,204,22,0.08)',
    color: '#0F172A',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginBottom: '24px',
    letterSpacing: '0.3px'
  },
  activeModeBtn: {
    background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
    border: '1px solid rgba(132,204,22,0.5)',
    boxShadow: '0 4px 12px rgba(132,204,22,0.3)',
    transform: 'translateY(-2px)',
    color: '#064e3b'
  },
  slider: {
    width: '100%',
    marginTop: '10px',
    cursor: 'pointer'
  },
  yearLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    marginTop: '5px',
    opacity: 0.8
  },
  changeYearSelector: {
    marginBottom: '24px',
    padding: '20px',
    background: 'rgba(132,204,22,0.08)',
    borderRadius: '12px',
    border: '1px solid rgba(132,204,22,0.2)'
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontSize: '0.9rem',
    fontWeight: '600',
    letterSpacing: '0.3px',
    color: '#0F172A'
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid rgba(132,204,22,0.3)',
    background: '#ffffff',
    color: '#0F172A',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  tabContainer: {
    marginTop: '24px'
  },
  tabNav: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '6px',
    marginBottom: '20px',
    borderBottom: '1px solid rgba(132,204,22,0.2)',
    paddingBottom: '0'
  },
  tab: {
    padding: '10px 8px',
    border: 'none',
    background: 'transparent',
    color: '#64748b',
    borderRadius: '8px 8px 0 0',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    transition: 'all 0.2s',
    position: 'relative',
    letterSpacing: '0.3px'
  },
  activeTab: {
    color: '#84cc16',
    background: 'rgba(132,204,22,0.1)',
    boxShadow: '0 -2px 0 0 #84cc16 inset'
  },
  tabContent: {
    animation: 'fadeIn 0.3s ease-in'
  }
};

export default App;
