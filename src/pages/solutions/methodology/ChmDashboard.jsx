import React, { useState, useEffect } from "react";
// UPDATED PATHS: Ensure these point correctly to your components folder
import ChmSidebar from "../../../components/chm/ChmSidebar";
import ChmMap from "../../../components/chm/ChmMap";

const ChmDashboard = () => {
  const [currentPolygon, setCurrentPolygon] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [year, setYear] = useState(2021);

  const handlePolygonComplete = (geojson) => {
    setCurrentPolygon(geojson);
    setResult(null); 
  };

  const handleRunAnalysis = async (selectedYear) => {
    if (!currentPolygon) return;
    setIsAnalyzing(true);
    try {
      const response = await fetch("http://localhost:5000/api/chm/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ polygon: currentPolygon, year: selectedYear }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setResult({ status: "success", results: data });
    } catch (err) {
      console.error("❌ CHM error:", err);
      setResult({ status: "error", message: err.message });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    // h-screen and w-full are required to prevent the "White Blank" map area
    <div className="flex h-screen w-full bg-[#1a1f1a] overflow-hidden">
      <ChmSidebar
        hasPolygon={!!currentPolygon}
        isAnalyzing={isAnalyzing}
        result={result}
        year={year}
        setYear={setYear} // Passing this fixes the "setYear is not a function" error
        onRunAnalysis={handleRunAnalysis}
      />
      
      {/* Container for the Map */}
      <div className="relative flex-1 h-full bg-[#0a0c0a]">
        <ChmMap onPolygonComplete={handlePolygonComplete} />
        
        {/* Loading Spinner Overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 z-[1000] bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-[#a4fca1]/20 border-t-[#a4fca1] rounded-full animate-spin" />
              <p className="text-[10px] font-bold text-[#a4fca1] tracking-widest uppercase">Analyzing AOI...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChmDashboard;