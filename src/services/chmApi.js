export async function runChmAnalysis(geojson) {
    const res = await fetch("http://localhost:5000/chm/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ geometry: geojson })
    });
  
    if (!res.ok) throw new Error("CHM analysis failed");
    return res.json();
  }
  