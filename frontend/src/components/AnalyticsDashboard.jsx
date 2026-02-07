import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

export default function AnalyticsDashboard({ dacbData, changeData, riskData, leakageData, baseline }) {
  
  if (!dacbData || !changeData) {
    return (
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>📊</div>
        <div style={styles.emptyTitle}>No Analytics Data</div>
        <div style={styles.emptyText}>Run analysis to view charts and insights</div>
      </div>
    );
  }

  // Data preparation
  const timelineData = [
    { year: baseline?.baseline_year || 2019, baseline: dacbData.project_forest_baseline_km2, actual: dacbData.project_forest_baseline_km2 },
    { year: dacbData.current_year, baseline: dacbData.expected_forest_km2, actual: dacbData.observed_forest_km2 }
  ];

  const landUseData = Object.entries(changeData.changes).map(([key, data]) => ({
    name: data.class_name,
    value: data.current_km2,
    percentage: data.current_pct
  })).slice(0, 5);

  const waterfallData = [
    { name: 'Gross Credits', value: dacbData.avoided_deforestation_km2, color: '#84cc16' },
    { name: 'Leakage Adj', value: -dacbData.avoided_deforestation_km2 * (1 - dacbData.leakage_adjustment_factor), color: '#f59e0b' },
    { name: 'Net Credits', value: dacbData.adjusted_avoided_deforestation_km2, color: '#10b981' }
  ];

  const leakageComparisonData = [
    { name: 'Project Area', deforestation: dacbData.project_forest_baseline_km2 - dacbData.project_forest_current_km2 },
    { name: 'Buffer Zone', deforestation: dacbData.control_forest_baseline_km2 - dacbData.control_forest_current_km2 }
  ];

  const riskGaugeData = [
    { name: 'Risk', value: riskData?.risk_score || 0, fill: riskData?.risk_level === 'LOW' ? '#10b981' : riskData?.risk_level === 'MEDIUM' ? '#f59e0b' : '#ef4444' }
  ];

  const COLORS = ['#84cc16', '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div style={styles.container}>
      {/* Row 1: Timeline + Land Use */}
      <div style={styles.row}>
        <div style={styles.chartCard}>
          <div style={styles.chartTitle}>🌲 Forest Cover Timeline</div>
          <div style={styles.chartSubtitle}>Baseline vs Actual</div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" stroke="#64748b" style={{fontSize: '12px'}} />
              <YAxis stroke="#64748b" style={{fontSize: '12px'}} />
              <Tooltip contentStyle={{background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px'}} />
              <Legend />
              <Area type="monotone" dataKey="baseline" stroke="#ef4444" fillOpacity={1} fill="url(#colorBaseline)" name="Expected (Baseline)" />
              <Area type="monotone" dataKey="actual" stroke="#84cc16" fillOpacity={1} fill="url(#colorActual)" name="Observed (Actual)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartCard}>
          <div style={styles.chartTitle}>🗺️ Land Use Distribution</div>
          <div style={styles.chartSubtitle}>Current Composition</div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={landUseData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={(entry) => `${entry.name}: ${entry.percentage.toFixed(1)}%`}
                labelStyle={{fontSize: '11px', fontWeight: '600'}}
              >
                {landUseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px'}} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Waterfall + Risk Gauge */}
      <div style={styles.row}>
        <div style={styles.chartCard}>
          <div style={styles.chartTitle}>💰 Carbon Credit Flow</div>
          <div style={styles.chartSubtitle}>Adjustments Applied</div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={waterfallData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" style={{fontSize: '12px'}} />
              <YAxis stroke="#64748b" style={{fontSize: '12px'}} />
              <Tooltip contentStyle={{background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px'}} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {waterfallData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartCard}>
          <div style={styles.chartTitle}>⚡ Risk Assessment</div>
          <div style={styles.chartSubtitle}>Overall Score</div>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart 
              cx="50%" 
              cy="50%" 
              innerRadius="60%" 
              outerRadius="90%" 
              data={riskGaugeData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar
                minAngle={15}
                background
                clockWise
                dataKey="value"
                cornerRadius={10}
              />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" style={{fontSize: '32px', fontWeight: '700', fill: '#0f172a'}}>
                {riskData?.risk_score || 0}
              </text>
              <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" style={{fontSize: '14px', fill: '#64748b'}}>
                {riskData?.risk_level || 'N/A'}
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Leakage Comparison */}
      <div style={styles.row}>
        <div style={{...styles.chartCard, gridColumn: '1 / -1'}}>
          <div style={styles.chartTitle}>🔍 Leakage Analysis</div>
          <div style={styles.chartSubtitle}>Project vs Buffer Zone</div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={leakageComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" style={{fontSize: '12px'}} />
              <YAxis stroke="#64748b" style={{fontSize: '12px'}} label={{ value: 'Deforestation (km²)', angle: -90, position: 'insideLeft', style: {fontSize: '12px', fill: '#64748b'} }} />
              <Tooltip contentStyle={{background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px'}} />
              <Bar dataKey="deforestation" fill="#84cc16" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div style={styles.leakageNote}>
            <strong>Leakage Ratio:</strong> {dacbData.leakage_ratio}x ({dacbData.leakage_severity})
            <span style={{marginLeft: '16px'}}>
              <strong>Adjustment Factor:</strong> {dacbData.leakage_adjustment_factor}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div style={styles.kpiRow}>
        <div style={styles.kpiCard}>
          <div style={styles.kpiLabel}>Avoided Deforestation</div>
          <div style={styles.kpiValue}>{dacbData.avoided_deforestation_km2} <span style={styles.kpiUnit}>km²</span></div>
        </div>
        <div style={styles.kpiCard}>
          <div style={styles.kpiLabel}>Net Carbon Credits</div>
          <div style={styles.kpiValue}>{dacbData.adjusted_avoided_deforestation_km2} <span style={styles.kpiUnit}>km²</span></div>
        </div>
        <div style={styles.kpiCard}>
          <div style={styles.kpiLabel}>Permanence Score</div>
          <div style={styles.kpiValue}>{dacbData.permanence_score}<span style={styles.kpiUnit}>%</span></div>
        </div>
        <div style={styles.kpiCard}>
          <div style={styles.kpiLabel}>Confidence Level</div>
          <div style={{...styles.kpiValue, color: dacbData.confidence === 'HIGH' ? '#10b981' : dacbData.confidence === 'MEDIUM' ? '#f59e0b' : '#ef4444'}}>
            {dacbData.confidence}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  chartCard: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  chartTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '4px'
  },
  chartSubtitle: {
    fontSize: '13px',
    color: '#64748b',
    marginBottom: '16px'
  },
  leakageNote: {
    marginTop: '16px',
    padding: '12px',
    background: 'rgba(132,204,22,0.1)',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#0f172a',
    fontWeight: '500'
  },
  kpiRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px'
  },
  kpiCard: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #e2e8f0',
    textAlign: 'center'
  },
  kpiLabel: {
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '600'
  },
  kpiValue: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#0f172a'
  },
  kpiUnit: {
    fontSize: '16px',
    color: '#64748b',
    fontWeight: '500'
  },
  empty: {
    textAlign: 'center',
    padding: '60px 24px',
    color: '#64748b'
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: '8px'
  },
  emptyText: {
    fontSize: '14px',
    lineHeight: '1.6'
  }
};
