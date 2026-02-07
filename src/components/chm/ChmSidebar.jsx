import React, { useState } from "react";
import { ChevronDown, ChevronRight, Eye, FileUp, Target, ShieldAlert, Layers } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const AccordionItem = ({ title, value, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-white/10">
      <div className="flex items-center justify-between py-4 cursor-pointer group hover:bg-white/5 transition-colors" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-2">
          {isOpen ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-200">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-mono text-[#a4fca1]">{value}</span>
          <Eye size={14} className="text-gray-600 group-hover:text-white transition-colors" />
        </div>
      </div>
      {isOpen && <div className="pb-4 space-y-3 px-2">{children}</div>}
    </div>
  );
};

const DataRow = ({ label, value, unit, colorClass = "bg-[#a4fca1]" }) => (
  <div className="flex items-center justify-between py-1 group">
    <div className="flex items-center gap-3">
      <div className={`w-[2px] h-3 ${colorClass} opacity-60`} />
      <span className="text-[12px] text-gray-400 group-hover:text-gray-200 transition-colors">{label}</span>
    </div>
    <span className="text-[12px] font-mono">{value ?? "--"} <span className="text-[9px] text-gray-500 uppercase">{unit}</span></span>
  </div>
);

export default function ChmSidebar({ hasPolygon, isAnalyzing, result, year, setYear, onRunAnalysis, onImportAOI }) {
  // Safe data extraction to prevent "reading properties of undefined"
  const data = result?.status === "success" ? result.results : null;
  const history = data?.yearly_history || [];
  
  // Logic: Only show biomass estimation if tree cover is detected
  const showBiomass = data?.eligibility?.eligible_ha > 0;

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (file && onImportAOI) onImportAOI(file);
  };

  return (
    <div className="w-[450px] h-screen bg-[#2d352b] text-white flex flex-col p-8 font-sans overflow-y-auto select-none border-r border-white/5 custom-scrollbar">
      <header className="mb-8">
        <h1 className="text-2xl font-normal tracking-tight">CHM Analysis</h1>
        <p className="text-[11px] text-gray-500 uppercase tracking-widest mt-1 italic opacity-70">Structural Forest Canopy Intelligence</p>
      </header>

      {/* 1. AOI AREA (Hectares) */}
      <div className="mb-6">
        <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
            <Layers size={18} className="text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total AOI Area</span>
          </div>
          <span className="text-xl font-mono font-bold text-white">
            {data?.total_area_ha?.toLocaleString() || "--"} <span className="text-xs font-normal text-gray-500 uppercase">ha</span>
          </span>
        </div>
      </div>

      {/* YEAR SELECTOR */}
      <div className="mb-8">
        <div className="grid grid-cols-6 gap-1 bg-white/5 p-1 rounded-lg">
          {[2019, 2020, 2021, 2022, 2023, 2024].map((y) => (
            <button 
              key={y} 
              onClick={() => setYear(y)} 
              className={`py-2 text-[10px] font-mono rounded transition-all ${y === year ? "bg-[#a4fca1] text-black font-bold shadow-[0_0_10px_rgba(164,252,161,0.3)]" : "text-gray-500 hover:text-white"}`}
            >
              {y % 100}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-1">
        {data ? (
          <>
            {/* 2. LIDAR STATISTICS */}
            <AccordionItem title="Lidar Statistics" value={`${data.model_prediction?.avg?.toFixed(1) || 0}m Avg`} defaultOpen={true}>
              <DataRow label="Max Canopy Height" value={data.model_prediction?.max?.toFixed(1)} unit="m" />
              <DataRow label="Min Canopy Height" value={data.model_prediction?.min?.toFixed(1)} unit="m" />
              <DataRow label="Std Deviation" value={data.model_prediction?.std?.toFixed(2)} unit="σ" colorClass="bg-blue-400" />
            </AccordionItem>

            {/* 3. LAND ELIGIBILITY */}
            <AccordionItem title="Land Eligibility" value={`${data.eligibility?.percentage || 0}% Suitable`} defaultOpen={true}>
              <div className="py-2">
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden mb-4">
                  <div className="bg-[#a4fca1] h-full transition-all duration-1000 shadow-[0_0_8px_rgba(164,252,161,0.5)]" style={{ width: `${data.eligibility?.percentage || 0}%` }} />
                </div>
                <DataRow label="Eligible (Forest/Mangrove)" value={data.eligibility?.eligible_ha} unit="ha" colorClass="bg-[#a4fca1]" />
                <DataRow label="Ineligible (Urban/Water)" value={data.eligibility?.ineligible_ha} unit="ha" colorClass="bg-red-900" />
              </div>
            </AccordionItem>

            {/* 4. BIOMASS ESTIMATION - Conditional based on Tree Cover */}
            {showBiomass ? (
              <AccordionItem title="Biomass Estimation" value={`${data.tree_count?.total?.toLocaleString() || 0} Trees`}>
                <DataRow label="Total Tree Count" value={data.tree_count?.total?.toLocaleString()} unit="Est" colorClass="bg-purple-500" />
                <DataRow label="Stock Density" value={data.tree_count?.per_hectare} unit="Trees/ha" colorClass="bg-purple-500" />
                <div className="mt-6 h-16 w-full opacity-30">
                  <ResponsiveContainer><AreaChart data={history}><Area type="monotone" dataKey="height" stroke="#a4fca1" fill="#a4fca1" fillOpacity={0.1} /></AreaChart></ResponsiveContainer>
                </div>
              </AccordionItem>
            ) : (
              <div className="py-6 border-t border-white/10 text-center">
                <p className="text-[10px] uppercase tracking-widest text-red-400 opacity-60">Not Applicable on this Land Type</p>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center opacity-20 italic text-[10px] uppercase tracking-widest font-bold">Awaiting Boundary Input</div>
        )}
      </div>

      <div className="mt-8 space-y-3">
        {/* IMPORT AOI BUTTON (Custom Styled) */}
        <label className="w-full border border-white/10 rounded-full py-3 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 hover:bg-white/5 transition-all cursor-pointer">
          <FileUp size={14} />
          Import AOI (KML/Polygon)
          <input type="file" className="hidden" accept=".kml,.json,.geojson" onChange={handleFileImport} />
        </label>

        <button 
          onClick={() => onRunAnalysis(year)} 
          disabled={!hasPolygon || isAnalyzing} 
          className="w-full bg-[#6cd9ff] text-black rounded-full py-4 text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(108,217,255,0.15)] disabled:opacity-20 transition-all hover:brightness-110"
        >
          {isAnalyzing ? "Processing Lidar..." : "Run New Analysis"}
        </button>
      </div>
    </div>
  );
}