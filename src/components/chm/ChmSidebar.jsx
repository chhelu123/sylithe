import React from "react";

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025];

const safe = (v, d = 2) =>
  typeof v === "number" ? v.toFixed(d) : "--";

export default function ChmSidebar({
  hasPolygon,
  isAnalyzing,
  result,
  year,
  setYear,
  onRunAnalysis
}) {
  const data = result?.results || null;
  const predicted = data?.model_prediction || null;

  return (
    <div className="w-[420px] h-full p-6 bg-white border-r overflow-y-auto shadow-2xl flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800">CHM Analysis</h2>

      {/* YEAR SELECTOR */}
      <div>
        <p className="text-xs font-bold text-gray-500 mb-2">Analysis Year</p>
        <div className="grid grid-cols-4 gap-2">
          {YEARS.map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`py-2 rounded-lg text-sm font-mono border ${
                year === y
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* RUN BUTTON */}
      <button
        disabled={!hasPolygon || isAnalyzing}
        onClick={onRunAnalysis}
        className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
          hasPolygon
            ? "bg-green-600 hover:bg-green-700 shadow-lg"
            : "bg-gray-300"
        }`}
      >
        {isAnalyzing ? "Processing CHM @10m..." : "Submit Analysis"}
      </button>

      {/* RESULTS */}
      {predicted ? (
        <>
          <div className="p-5 bg-gray-900 rounded-2xl text-white shadow-xl">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
              Height Summary ({year})
            </h3>

            <p className="text-4xl font-mono font-bold mb-4">
              {safe(predicted.avg)} m
            </p>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-[10px] text-gray-400">MIN</p>
                <p className="font-mono">{safe(predicted.min)} m</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">AVG</p>
                <p className="font-mono">{safe(predicted.avg)} m</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">MAX</p>
                <p className="font-mono">{safe(predicted.max)} m</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl border">
              <p className="text-xs font-bold text-emerald-700">Pixels Evaluated</p>
              <p className="text-xl font-mono">{data.pixel_count}</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border">
              <p className="text-xs font-bold text-blue-700">Model</p>
              <p className="text-xl font-mono">Sylithe CHM v1</p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-3xl text-gray-400 p-10 text-center">
          <p className="text-sm">
            Draw a polygon → select year → run analysis
          </p>
        </div>
      )}
    </div>
  );
}
