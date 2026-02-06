import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

const Map = ({ onPolygonDrawn, tileUrl, bufferTileUrl }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const drawnLayerRef = useRef(null);
  const lulcLayerRef = useRef(null);
  const bufferLayerRef = useRef(null);
  const locationMarkerRef = useRef(null);
  const [baseLayer, setBaseLayer] = useState('street');

  const goToMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const map = mapInstanceRef.current;
          
          map.setView([latitude, longitude], 13);
          
          if (locationMarkerRef.current) {
            map.removeLayer(locationMarkerRef.current);
          }
          
          const marker = L.marker([latitude, longitude], {
            icon: L.divIcon({
              className: 'location-marker',
              html: '<div style="background: #84cc16; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
              iconSize: [20, 20]
            })
          }).addTo(map);
          
          locationMarkerRef.current = marker;
        },
        (error) => {
          alert('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  useEffect(() => {
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([20, 78], 5);
      
      // Street layer
      const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      });
      
      // Satellite layer
      const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri'
      });
      
      streetLayer.addTo(map);
      
      // Store layers for switching
      map.streetLayer = streetLayer;
      map.satelliteLayer = satelliteLayer;

      const drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);
      drawnLayerRef.current = drawnItems;

      const drawControl = new L.Control.Draw({
        draw: {
          polygon: true,
          polyline: false,
          rectangle: true,
          circle: false,
          marker: false,
          circlemarker: false
        },
        edit: {
          featureGroup: drawnItems,
          remove: true
        }
      });
      map.addControl(drawControl);

      map.on(L.Draw.Event.CREATED, (e) => {
        drawnItems.clearLayers();
        drawnItems.addLayer(e.layer);
        
        const geojson = e.layer.toGeoJSON();
        onPolygonDrawn(geojson);
      });

      mapInstanceRef.current = map;
    }
  }, [onPolygonDrawn]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      const map = mapInstanceRef.current;
      
      if (baseLayer === 'satellite') {
        map.removeLayer(map.streetLayer);
        map.addLayer(map.satelliteLayer);
      } else {
        map.removeLayer(map.satelliteLayer);
        map.addLayer(map.streetLayer);
      }
    }
  }, [baseLayer]);

  useEffect(() => {
    if (tileUrl && mapInstanceRef.current) {
      if (lulcLayerRef.current) {
        mapInstanceRef.current.removeLayer(lulcLayerRef.current);
      }

      const lulcLayer = L.tileLayer(tileUrl, {
        opacity: 0.7
      });
      lulcLayer.addTo(mapInstanceRef.current);
      lulcLayerRef.current = lulcLayer;
    }
  }, [tileUrl]);

  useEffect(() => {
    if (bufferTileUrl && mapInstanceRef.current) {
      if (bufferLayerRef.current) {
        mapInstanceRef.current.removeLayer(bufferLayerRef.current);
      }

      const bufferLayer = L.tileLayer(bufferTileUrl, {
        opacity: 1.0
      });
      bufferLayer.addTo(mapInstanceRef.current);
      bufferLayerRef.current = bufferLayer;
    } else if (!bufferTileUrl && bufferLayerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(bufferLayerRef.current);
      bufferLayerRef.current = null;
    }
  }, [bufferTileUrl]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      
      <div style={styles.layerToggle}>
        <button 
          onClick={() => setBaseLayer('street')} 
          style={{...styles.toggleBtn, ...(baseLayer === 'street' ? styles.activeBtn : {})}}
        >
          Street
        </button>
        <button 
          onClick={() => setBaseLayer('satellite')} 
          style={{...styles.toggleBtn, ...(baseLayer === 'satellite' ? styles.activeBtn : {})}}
        >
          Satellite
        </button>
      </div>
      
      <button onClick={goToMyLocation} style={styles.locationBtn} title="Go to my location">
        ●
      </button>
    </div>
  );
};

const styles = {
  layerToggle: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1000,
    display: 'flex',
    gap: '5px',
    background: 'white',
    padding: '5px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  toggleBtn: {
    padding: '8px 16px',
    border: 'none',
    background: '#f0f0f0',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  activeBtn: {
    background: '#84cc16',
    color: '#064e3b'
  },
  locationBtn: {
    position: 'absolute',
    bottom: '100px',
    right: '10px',
    zIndex: 1000,
    width: '40px',
    height: '40px',
    border: 'none',
    background: 'white',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  }
};

export default Map;
