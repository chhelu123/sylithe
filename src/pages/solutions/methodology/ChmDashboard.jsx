import React, { useState } from "react";
import ChmSidebar from "../../../components/chm/ChmSidebar";
import ChmMap from "../../../components/chm/ChmMap";
import SylitheLeftNav from "../../../components/chm/SylitheLeftNav"; // Naya component import kiya

const ChmDashboard = () => {
  const [currentPolygon, setCurrentPolygon] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [year, setYear] = useState(2023);
  const [activeLayers, setActiveLayers] = useState(new Set());

  // Section toggle state (LULC or CHM)
  const [activeSection, setActiveSection] = useState('lulc');

  const handlePolygonComplete = (geojson) => {
    setCurrentPolygon(geojson);
    setResult(null); // Reset results for new area
    // setActiveLayers(new Set()); // Keep layers toggled on if user draws a new polygon
  };

  const handleLayerToggle = (id) => {
    setActiveLayers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleRunAnalysis = async (selectedYear) => {
    if (!currentPolygon) return;
    setIsAnalyzing(true);
    // document this: we DO NOT setResult(null) here because we want the old layers to remain visible under the loading spinner

    try {
      const response = await fetch("http://localhost:5000/api/chm/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          geojson: currentPolygon,
          year: selectedYear
        }),
      });

      const responseData = await response.json();

      if (!response.ok || responseData.status === "error") {
        throw new Error(responseData.message || "GEE Engine Error");
      }

      setResult(responseData);

    } catch (err) {
      console.error("❌ Analysis Error:", err.message);
      setResult({ status: "error", message: err.message });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveAndNext = () => {
    if (result?.status === "success") {
      alert("Saving Intelligence Data... Moving to next step.");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0d0f0d] overflow-hidden font-sans">

      {/* 1. Naya Left Sidebar Menu */}
      <SylitheLeftNav
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* 2. Result Sidebar (LULC or CHM data) */}
      <ChmSidebar
        activeSection={activeSection} // Pass section state to sidebar
        hasPolygon={!!currentPolygon}
        isAnalyzing={isAnalyzing}
        result={result}
        year={year}
        setYear={setYear}
        onRunAnalysis={handleRunAnalysis}
        activeLayers={activeLayers}
        onLayerToggle={handleLayerToggle}
        onSaveNext={handleSaveAndNext}
      />

      {/* 3. Main Map Section */}
      <div className="relative flex-1 h-full bg-[#0a0c0a]">
        <ChmMap
          onPolygonComplete={handlePolygonComplete}
          result={result}
          activeLayers={activeLayers}
        />

        {/* Loading Overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 z-[1000] bg-black/60 backdrop-blur-md flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 border-4 border-[#a4fca1] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#a4fca1] font-black uppercase tracking-[0.2em] animate-pulse text-sm">
              Processing Satellite Intelligence
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChmDashboard;