import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Marker,
  Circle,
  useMap
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

/* -------------------------------------------------
   LIVE LOCATION COMPONENT
--------------------------------------------------*/
const LiveLocation = () => {
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const latlng = [pos.coords.latitude, pos.coords.longitude];
        setPosition(latlng);
        setAccuracy(pos.coords.accuracy);

        // Optional: auto-center on first fix
        map.setView(latlng, 13);
      },
      (err) => {
        console.error("Location error:", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [map]);

  if (!position) return null;

  return (
    <>
      <Marker position={position} />
      <Circle
        center={position}
        radius={accuracy || 30}
        pathOptions={{ color: "blue", fillOpacity: 0.15 }}
      />
    </>
  );
};

/* -------------------------------------------------
   MAIN MAP
--------------------------------------------------*/
const ChmMap = ({ onPolygonComplete }) => {
  const handleCreated = (e) => {
    const layer = e.layer;
    const geojson = layer.toGeoJSON();
    onPolygonComplete(geojson);
  };

  return (
    <div className="absolute inset-0">
      <MapContainer
        center={[20.5937, 78.9629]} // India
        zoom={5}
        className="h-full w-full"
      >
        {/* SATELLITE BASEMAP */}
        <TileLayer
          attribution="© Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {/* LIVE GPS LOCATION */}
        <LiveLocation />

        {/* DRAW TOOLS */}
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleCreated}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default ChmMap;
