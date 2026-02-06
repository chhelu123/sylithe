# Sylithe Frontend

React + Vite frontend for LULC visualization.

## Setup

1. **Install dependencies**
```bash
npm install
```

2. **Run development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Features

- Interactive map with polygon drawing tools
- Real-time LULC analysis
- Visual statistics panel
- Tile-based rendering from Google Earth Engine

## Usage

1. Use the polygon/rectangle tool to draw an area of interest
2. The system automatically sends the AOI to the backend
3. LULC tiles are rendered on the map
4. Statistics appear in the right panel

## Tech Stack

- React 18
- Vite
- Leaflet (map rendering)
- Leaflet Draw (polygon drawing)
