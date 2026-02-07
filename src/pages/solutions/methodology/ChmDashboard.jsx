import React, { useState, useCallback } from "react";
import ChmMap from "../../../components/chm/ChmMap";
import ChmSidebar from "../../../components/chm/ChmSidebar";

const ChmDashboard = () => {
  const [polygon, setPolygon] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [year, setYear] = useState(2023); // ✅ NEW

  const handlePolygonComplete = useCallback((geoJson) => {
    setPolygon(geoJson);
    setError(null);
  }, []);

  const handleRunAnalysis = async () => {
    if (!polygon) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5001/chm/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          geojson: polygon,
          year: year // ✅ SEND YEAR
        }),
      });

      const result = await response.json();

      if (result.status === "error") {
        setError(result.message);
      } else {
        setAnalysisResult(result);
      }
    } catch (err) {
      setError("Backend connection failed. Is Flask running?");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <ChmSidebar
        hasPolygon={!!polygon}
        isAnalyzing={isAnalyzing}
        result={analysisResult}
        year={year}          // ✅ NEW
        setYear={setYear}    // ✅ NEW
        onRunAnalysis={handleRunAnalysis}
      />

      <div className="flex-1 relative">
        {error && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50
                          bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg">
            {error}
          </div>
        )}
        <ChmMap onPolygonComplete={handlePolygonComplete} />
      </div>
    </div>
  );
};

export default ChmDashboard;
