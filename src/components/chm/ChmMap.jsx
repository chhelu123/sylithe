import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON, useMap, Marker, Circle } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { FileUp } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

/* --- GPS COMPONENT --- */
const LiveLocation = () => {
  const [position, setPosition] = useState(null);
  const map = useMap();
  useEffect(() => {
    navigator.geolocation.watchPosition((pos) => {
      const latlng = [pos.coords.latitude, pos.coords.longitude];
      setPosition(latlng);
      map.setView(latlng, map.getZoom());
    });
  }, [map]);
  return position ? (
    <>
      <Marker position={position} />
      <Circle center={position} radius={50} pathOptions={{ color: "blue", fillOpacity: 0.1 }} />
    </>
  ) : null;
};

/* --- MAIN MAP --- */
const ChmMap = ({ onPolygonComplete }) => {
  const [importedGeoJson, setImportedGeoJson] = useState(null);

  const handleCreated = (e) => onPolygonComplete(e.layer.toGeoJSON());

  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target.result);
        setImportedGeoJson(json);
        onPolygonComplete(json);
      } catch (err) { alert("Invalid GeoJSON file."); }
    };
    reader.readAsText(file);
  };

  return (
    <div className="absolute inset-0">
      <div className="absolute top-4 right-14 z-[1000]">
        <label className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 border border-gray-100 transition-all group">
          <FileUp size={16} className="text-gray-500 group-hover:text-black" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Import AOI</span>
          <input type="file" accept=".geojson,.json" className="hidden" onChange={handleImport} />
        </label>
      </div>

      <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full w-full">
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="© Esri" />
        <LiveLocation />
        <FeatureGroup>
          <EditControl position="topright" onCreated={handleCreated} draw={{ rectangle: false, circle: false, marker: false, polyline: false }} />
          {importedGeoJson && <GeoJSON data={importedGeoJson} style={{ color: '#a4fca1', weight: 3, fillOpacity: 0.2 }} />}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default ChmMap;