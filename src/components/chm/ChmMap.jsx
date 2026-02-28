import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON, useMap, Marker, Circle, CircleMarker, Popup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { FileUp } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const LiveLocation = () => {
  const [position, setPosition] = useState(null);
  const map = useMap();
  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition((pos) => {
      const latlng = [pos.coords.latitude, pos.coords.longitude];
      setPosition(latlng);
    });
    return () => navigator.geolocation.clearWatch(watchId);
  }, [map]);
  return position ? (
    <>
      <Marker position={position} />
      <Circle center={position} radius={50} pathOptions={{ color: "blue", fillOpacity: 0.1 }} />
    </>
  ) : null;
};

const getChmColor = (height) => {
  if (height < 10) return "#a4fca1";
  if (height < 20) return "#70e4f3";
  if (height < 30) return "#4b98fa";
  return "#8a2be2";
};

const ChmMap = ({ onPolygonComplete, result, activeLayers = new Set() }) => {
  const [importedGeoJson, setImportedGeoJson] = useState(null);
  const tileUrls = result?.status === "success" ? result.results?.tiles : {};
  const chmPoints = result?.status === "success" ? result.results?.model_prediction?.points : null;

  const handleCreated = (e) => {
    const geojson = e.layer.toGeoJSON();
    onPolygonComplete(geojson);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
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
    <div className="absolute inset-0 z-10">
      <div className="absolute top-4 right-14 z-[1000]">
        <label className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 border border-gray-100 transition-all group">
          <FileUp size={16} className="text-gray-500 group-hover:text-black" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Import AOI</span>
          <input type="file" accept=".geojson,.json" className="hidden" onChange={handleImport} />
        </label>
      </div>

      <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full w-full bg-[#0d0f0d]">
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="© Esri" />

        {/* --- DYNAMIC GEE LAYERS (FIXED) --- */}
        {tileUrls && Object.entries(tileUrls).map(([id, url]) => {
          if (!activeLayers.has(id)) return null;

          const isPatch = id === 'burn_layer' || id === 'defor_layer';

          return (
            <TileLayer
              key={`${id}-${url}`}
              url={url}
              opacity={isPatch ? 1.0 : 0.7}
              zIndex={isPatch ? 1000 : 100}
            />
          );
        })}

        {/* --- CHM POINTS LAYER --- */}
        {activeLayers.has('chm_points') && chmPoints && chmPoints.map((pt, idx) => (
          <CircleMarker
            key={idx}
            center={[pt[0], pt[1]]}
            radius={4}
            pathOptions={{
              color: getChmColor(pt[2]),
              fillColor: getChmColor(pt[2]),
              fillOpacity: 0.8,
              weight: 0
            }}
          >
            <Popup className="font-sans text-[13px]">
              <div className="text-center font-bold">
                Height: <span style={{ color: getChmColor(pt[2]) }}>{pt[2]}m</span>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        <LiveLocation />

        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleCreated}
            draw={{
              rectangle: true, circle: false, marker: false, polyline: false, circlemarker: false,
              polygon: { shapeOptions: { color: '#ffffff', weight: 4, fillOpacity: 0.05, className: 'drop-shadow-lg' } }
            }}
          />
          {importedGeoJson && <GeoJSON data={importedGeoJson} style={{ color: '#ffffff', weight: 4, fillOpacity: 0.05, className: 'drop-shadow-lg' }} />}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default ChmMap;