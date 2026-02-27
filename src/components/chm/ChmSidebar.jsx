import React, { useState } from "react";
import { ChevronDown, ChevronRight, ChevronLeft, Eye, EyeOff, Ruler, Info } from "lucide-react";

// The new hollow-pill style row (used for sub-items)
const ClassificationRow = ({ title, area, color, onToggle, isActive }) => (
  <div className="flex items-center justify-between py-2 pl-4 hover:bg-white/[0.05] transition-all group cursor-pointer rounded-r-lg mr-2" onClick={onToggle}>
    <div className="flex items-center gap-3">
      {/* Hollow Pill inside */}
      <div className="flex items-center justify-center w-3 h-[18px]">
        <div className={`w-[6px] h-[14px] rounded-full border-[1.5px] ${color}`} />
      </div>
      <span className="text-[13px] text-gray-200 group-hover:text-white font-medium">{title}</span>
    </div>
    <div className="flex items-center gap-3 pr-2">
      <span className="text-[12px] text-gray-300 font-mono tracking-tight">{area || 0} ha</span>
      <button className={`p-1 rounded transition-all ${isActive ? 'text-white' : 'text-gray-500 hover:text-white'}`}>
        {isActive ? <Eye size={14} /> : <EyeOff size={14} />}
      </button>
    </div>
  </div>
);

const TimelineSlider = ({ label, yearRange, setYearRange, area, onRefresh, color }) => (
  <div className="pl-4 pr-6 py-4 space-y-3">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-3 h-[18px]">
          <div className={`w-[6px] h-[14px] rounded-full border-[1.5px] ${color}`} />
        </div>
        <span className="text-[13px] text-gray-200 font-medium">{label}</span>
      </div>
      <span className="text-[12px] text-gray-300 font-mono">{area || 0} ha</span>
    </div>
    <div className="pl-4 pb-2">
      <input
        type="range"
        min="2012"
        max="2022"
        step="1"
        value={yearRange}
        onChange={(e) => setYearRange(parseInt(e.target.value))}
        onMouseUp={(e) => onRefresh(parseInt(e.target.value))}
        onTouchEnd={(e) => onRefresh(parseInt(e.target.value))}
        className="w-full h-[3px] bg-white/20 rounded-lg appearance-none cursor-pointer focus:outline-none"
        style={{ accentColor: "white" }}
      />
      <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 font-medium tracking-wide">
        <span>2012</span>
        <span>2022</span>
      </div>
    </div>
  </div>
);

export default function ChmSidebar({
  result,
  activeSection = 'lulc',
  activeLayers = new Set(),
  onLayerToggle,
  onRunAnalysis,
  isAnalyzing,
  hasPolygon,
  onSaveNext
}) {
  const data = result?.status === "success" ? result.results : null;
  const [open, setOpen] = useState({ eligible: true, ineligible: true, eligibleClass: true, ineligibleClass: true, burn: true, defor: true });

  const [burnYear, setBurnYear] = useState(2022);
  const [deforYear, setDeforYear] = useState(2022);

  const formatHa = (val) => val ? val.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 0;

  return (
    <div className="w-[450px] h-screen bg-[#2c3327]/80 backdrop-blur-[24px] text-white flex flex-col font-sans border-r border-white/5 shadow-2xl relative z-50">

      {/* Header Area */}
      <div className="px-6 pt-10 pb-2 shrink-0">
        <div className="flex flex-col mb-4">
          <button className="text-white hover:text-[#a4fca1] transition-colors self-start mb-6">
            <ChevronLeft size={20} />
          </button>
          <span className="text-[10px] tracking-widest uppercase font-bold text-gray-400 mb-1.5">Step 1 of 2</span>
          <h1 className="text-[26px] font-bold tracking-tight text-white mb-6">Assess land</h1>

          <div className="flex gap-6 border-b border-white/20">
            <button className="pb-3 text-[14px] font-semibold text-white border-b-2 border-white">Land eligibility</button>
            <button className="pb-3 text-[14px] font-medium text-gray-400 hover:text-gray-200">Credit projection</button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-3 mt-2">
        {result?.status === "error" && (
          <div className="px-4 py-3 mx-4 mb-4 bg-red-500/20 border border-red-500/30 rounded text-red-100 text-[13px] leading-relaxed">
            <span className="font-bold">Analysis Failed:</span> {result.message}
          </div>
        )}

        {/* CHM VIEW LOGIC */}
        {activeSection === 'chm' && (
          <div className="px-4 space-y-6 mt-4">
            <div className="flex items-center gap-3 mb-4 px-2">
              <Ruler size={18} className="text-[#a4fca1]" />
              <span className="text-[14px] font-bold uppercase tracking-tight">Canopy Heights</span>
            </div>

            {data?.model_prediction ? (
              <div className="grid grid-cols-2 gap-4 px-2">
                <div className="bg-black/20 p-5 rounded-xl border border-white/10 shadow-inner">
                  <p className="text-[11px] text-gray-400 uppercase tracking-widest font-black mb-2">Average Height</p>
                  <p className="text-3xl font-black text-[#a4fca1]">{data.model_prediction.avg}m</p>
                </div>
                <div className="bg-black/20 p-5 rounded-xl border border-white/10 shadow-inner">
                  <p className="text-[11px] text-gray-400 uppercase tracking-widest font-black mb-2">Max Height</p>
                  <p className="text-3xl font-black text-white">{data.model_prediction.max}m</p>
                </div>
              </div>
            ) : (
              <div className="bg-white/[0.02] p-8 mx-2 rounded-xl border border-dashed border-white/10 text-center">
                <p className="text-gray-400 text-[13px] leading-relaxed">Run analysis on a forested area to see height data.</p>
              </div>
            )}
          </div>
        )}

        {/* LULC VIEW LOGIC */}
        {activeSection === 'lulc' && data && data.lulc && data.eligibility && (
          <div className="space-y-2 px-3">

            {/* Progress Bar Header */}
            <div className="mb-8 mt-2 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[14px] tracking-wide text-white uppercase">Results</span>
                <Info size={14} className="text-gray-400" />
              </div>
              <p className="text-[13px] text-gray-300 leading-snug">
                Land must be an eligible classification type without recent deforestation.
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex-1 h-[14px] bg-white rounded-md overflow-hidden flex shadow-inner">
                  <div className="h-full bg-[#a4fca1] transition-all duration-700" style={{ width: `${data.eligibility.percentage}%` }} />
                </div>
                <span className="text-[14px] font-bold text-white shrink-0">{data.eligibility.percentage}% eligible</span>
              </div>
            </div>

            {/* 1. ELIGIBLE LAND */}
            <div>
              <button onClick={() => setOpen({ ...open, eligible: !open.eligible })} className="w-full flex items-center justify-between py-3 px-1 hover:bg-white/5 rounded-md transition-colors">
                <div className="flex items-center gap-3">
                  {open.eligible ? <ChevronDown size={14} className="text-white" /> : <ChevronRight size={14} className="text-white" />}
                  <div className="w-[7px] h-[18px] rounded-full bg-[#a4fca1]" />
                  <span className="text-[15px] font-semibold tracking-wide text-white">Eligible land</span>
                </div>
                <div className="flex items-center gap-3 pr-2">
                  <span className="text-[13px] text-gray-300 font-medium tracking-wide">{formatHa((data?.lulc?.cropland || 0) + (data?.lulc?.grass || 0) + (data?.lulc?.bare || 0))} ha</span>
                  <EyeOff size={16} className="text-gray-400 opacity-80" />
                </div>
              </button>

              {open.eligible && (
                <div className="pl-6 border-l-[1.5px] border-white/[0.08] ml-[10px] pb-2">

                  {/* Nested: Eligible Classification */}
                  <button onClick={() => setOpen({ ...open, eligibleClass: !open.eligibleClass })} className="w-full flex items-center justify-between py-2 pl-2 hover:bg-white/5 rounded transition-colors mt-1 group">
                    <div className="flex items-center gap-3">
                      {open.eligibleClass ? <ChevronDown size={14} className="text-gray-500 group-hover:text-white" /> : <ChevronRight size={14} className="text-gray-500 group-hover:text-white" />}
                      <span className="text-[13px] text-gray-200">Eligible land classification</span>
                    </div>
                    <div className="flex items-center gap-3 pr-4">
                      {/* Image doesn't clearly show hectares here, but we will add an eyeOff icon */}
                      <EyeOff size={14} className="text-gray-500 opacity-50" />
                    </div>
                  </button>

                  {open.eligibleClass && (
                    <div className="pl-6 border-l-[1.5px] border-white/[0.08] ml-[11px] mt-1 space-y-1">
                      <ClassificationRow title="Cropland" area={formatHa(data?.lulc?.cropland)} color="border-[#a4fca1]" isActive={activeLayers.has('cropland')} onToggle={() => onLayerToggle('cropland')} />
                      <ClassificationRow title="Range/grass/shrubland" area={formatHa(data?.lulc?.grass)} color="border-[#a4b5c4]" isActive={activeLayers.has('grass')} onToggle={() => onLayerToggle('grass')} />
                      <ClassificationRow title="Bareland" area={formatHa(data?.lulc?.bare)} color="border-[#4ca1df]" isActive={activeLayers.has('bare')} onToggle={() => onLayerToggle('bare')} />
                    </div>
                  )}

                  {/* Burn Area block */}
                  <button onClick={() => setOpen({ ...open, burn: !open.burn })} className="w-full flex items-center justify-between py-2 pl-2 hover:bg-white/5 rounded transition-colors mt-2 group">
                    <div className="flex items-center gap-3">
                      {open.burn ? <ChevronDown size={14} className="text-gray-500 group-hover:text-white" /> : <ChevronRight size={14} className="text-gray-500 group-hover:text-white" />}
                      <span className="text-[13px] text-gray-200">Burn area</span>
                    </div>
                    <div className="flex items-center gap-3 pr-4">
                      <EyeOff size={14} className="text-gray-500 opacity-50" />
                    </div>
                  </button>

                  {open.burn && (
                    <div className="pl-6 border-l-[1.5px] border-white/[0.08] ml-[11px] mt-1">
                      <TimelineSlider label="" color="border-[#4ca1df]" yearRange={burnYear} setYearRange={setBurnYear} area={formatHa(data?.lulc?.burn)} onRefresh={(yr) => onRunAnalysis(yr)} />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 2. INELIGIBLE LAND */}
            <div className="mt-4">
              <button onClick={() => setOpen({ ...open, ineligible: !open.ineligible })} className="w-full flex items-center justify-between py-3 px-1 hover:bg-white/5 rounded-md transition-colors">
                <div className="flex items-center gap-3">
                  {open.ineligible ? <ChevronDown size={14} className="text-white" /> : <ChevronRight size={14} className="text-white" />}
                  <div className="w-[7px] h-[18px] rounded-full bg-white" />
                  <span className="text-[15px] font-semibold tracking-wide text-white">Ineligible land</span>
                </div>
                <div className="flex items-center gap-3 pr-2">
                  <span className="text-[13px] text-gray-300 font-medium tracking-wide">{formatHa((data?.lulc?.water || 0) + (data?.lulc?.mangroves || 0) + (data?.lulc?.urban || 0) + (data?.lulc?.trees || 0) + (data?.lulc?.ice_snow || 0) + (data?.lulc?.clouds || 0))} ha</span>
                  <EyeOff size={16} className="text-gray-400 opacity-80" />
                </div>
              </button>

              {open.ineligible && (
                <div className="pl-6 border-l-[1.5px] border-white/[0.08] ml-[10px] pb-4">

                  {/* Nested: Ineligible Classification */}
                  <button onClick={() => setOpen({ ...open, ineligibleClass: !open.ineligibleClass })} className="w-full flex items-center justify-between py-2 pl-2 hover:bg-white/5 rounded transition-colors mt-1 group">
                    <div className="flex items-center gap-3">
                      {open.ineligibleClass ? <ChevronDown size={14} className="text-gray-500 group-hover:text-white" /> : <ChevronRight size={14} className="text-gray-500 group-hover:text-white" />}
                      <span className="text-[13px] text-gray-200">Ineligible land classification</span>
                    </div>
                    <div className="flex items-center gap-3 pr-4">
                      <span className="text-[12px] text-gray-300 font-medium tracking-wide">{formatHa((data?.lulc?.water || 0) + (data?.lulc?.mangroves || 0) + (data?.lulc?.urban || 0) + (data?.lulc?.trees || 0) + (data?.lulc?.ice_snow || 0) + (data?.lulc?.clouds || 0))} ha</span>
                      <EyeOff size={14} className="text-gray-500 opacity-50" />
                    </div>
                  </button>

                  {open.ineligibleClass && (
                    <div className="pl-6 border-l-[1.5px] border-white/[0.08] ml-[11px] mt-1 space-y-1">
                      <ClassificationRow title="Forest land" area={formatHa(data?.lulc?.trees)} color="border-[#e3ef71]" isActive={activeLayers.has('trees')} onToggle={() => onLayerToggle('trees')} />
                      <ClassificationRow title="Water bodies" area={formatHa(data?.lulc?.water)} color="border-[#ef986e]" isActive={activeLayers.has('water')} onToggle={() => onLayerToggle('water')} />
                      <ClassificationRow title="Flooded vegetation" area={formatHa(data?.lulc?.mangroves)} color="border-[#d9812f]" isActive={activeLayers.has('mangroves')} onToggle={() => onLayerToggle('mangroves')} />
                      <ClassificationRow title="Ice/snow" area={formatHa(data?.lulc?.ice_snow)} color="border-[#b24fdb]" isActive={activeLayers.has('ice_snow')} onToggle={() => onLayerToggle('ice_snow')} />
                      <ClassificationRow title="Urban/built-up land" area={formatHa(data?.lulc?.urban)} color="border-[#8a2be2]" isActive={activeLayers.has('urban')} onToggle={() => onLayerToggle('urban')} />
                      <ClassificationRow title="Clouds" area={formatHa(data?.lulc?.clouds)} color="border-[#8b0000]" isActive={activeLayers.has('clouds')} onToggle={() => onLayerToggle('clouds')} />
                    </div>
                  )}

                  {/* Deforestation Block */}
                  <button onClick={() => setOpen({ ...open, defor: !open.defor })} className="w-full flex items-center justify-between py-2 pl-2 hover:bg-white/5 rounded transition-colors mt-2 group">
                    <div className="flex items-center gap-3">
                      {open.defor ? <ChevronDown size={14} className="text-gray-500 group-hover:text-white" /> : <ChevronRight size={14} className="text-gray-500 group-hover:text-white" />}
                      <span className="text-[13px] text-gray-200">Non-burn deforestation</span>
                    </div>
                    <div className="flex items-center gap-3 pr-4">
                      <span className="text-[12px] text-gray-300 font-mono">{formatHa(data?.lulc?.defor)} ha</span>
                      <EyeOff size={14} className="text-gray-500 opacity-50" />
                    </div>
                  </button>

                  {open.defor && (
                    <div className="pl-6 border-l-[1.5px] border-white/[0.08] ml-[11px] mt-1">
                      <ClassificationRow title="Pre existing vegetation" color="border-gray-500" isActive={false} onToggle={() => { }} />
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-8 space-y-3 z-10 w-full shrink-0">
        {!data ? (
          <button
            onClick={() => onRunAnalysis(2022)}
            disabled={!hasPolygon || isAnalyzing}
            className="w-full bg-[#a4fca1] text-[#0d0f0d] font-bold py-3.5 rounded-full text-[13px] disabled:opacity-30 uppercase tracking-[0.1em] transition-all hover:bg-white"
          >
            {isAnalyzing ? "Processing Region..." : "RUN INITIAL BOUNDARY"}
          </button>
        ) : (
          <>
            <button
              onClick={onSaveNext}
              className="w-full bg-[#a4fca1] text-[#0d0f0d] font-bold py-3.5 rounded-full text-[13px] uppercase tracking-[0.1em] hover:bg-white transition-all shadow-lg"
            >
              SAVE AND NEXT
            </button>
            <button
              className="w-full border border-white/40 text-white font-bold py-3.5 rounded-full text-[13px] uppercase tracking-[0.1em] hover:bg-white/10 transition-all font-sans"
            >
              RETURN TO DASHBOARD
            </button>
          </>
        )}

        <div className="text-center pt-4">
          <a href="#" className="text-[10px] text-gray-300 underline decoration-gray-500 font-bold tracking-[0.15em] hover:text-[#a4fca1] transition-colors">
            DISCLAIMER • DATA SOURCES
          </a>
        </div>
      </div>
    </div>
  );
}