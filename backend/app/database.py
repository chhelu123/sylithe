import sqlite3
import json
from datetime import datetime
import hashlib

DB_PATH = "sylithe.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            aoi_geojson TEXT NOT NULL,
            tile_url TEXT NOT NULL,
            stats TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS cache (
            aoi_hash TEXT PRIMARY KEY,
            tile_url TEXT NOT NULL,
            stats TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS baselines (
            id TEXT PRIMARY KEY,
            aoi_geojson TEXT NOT NULL,
            baseline_year INTEGER NOT NULL,
            stats TEXT NOT NULL,
            tile_url TEXT NOT NULL,
            area_km2 REAL NOT NULL,
            locked BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            locked_at TIMESTAMP,
            locked_by TEXT
        )
    """)
    
    conn.commit()
    conn.close()

def hash_aoi(aoi_geojson: dict, start_date: str, end_date: str) -> str:
    data = f"{json.dumps(aoi_geojson, sort_keys=True)}{start_date}{end_date}"
    return hashlib.sha256(data.encode()).hexdigest()

def hash_baseline(aoi_geojson: dict, year: int) -> str:
    data = f"{json.dumps(aoi_geojson, sort_keys=True)}{year}"
    return hashlib.sha256(data.encode()).hexdigest()

def get_cached(aoi_hash: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT tile_url, stats FROM cache WHERE aoi_hash = ?", (aoi_hash,))
    result = cursor.fetchone()
    conn.close()
    return result

def save_cache(aoi_hash: str, tile_url: str, stats: dict):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT OR REPLACE INTO cache (aoi_hash, tile_url, stats) VALUES (?, ?, ?)",
        (aoi_hash, tile_url, json.dumps(stats))
    )
    conn.commit()
    conn.close()

def log_request(aoi_geojson: dict, tile_url: str, stats: dict):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO requests (aoi_geojson, tile_url, stats) VALUES (?, ?, ?)",
        (json.dumps(aoi_geojson), tile_url, json.dumps(stats))
    )
    conn.commit()
    conn.close()

# Baseline functions
def get_baseline(baseline_id: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id, aoi_geojson, baseline_year, stats, tile_url, area_km2, locked, created_at, locked_at FROM baselines WHERE id = ?",
        (baseline_id,)
    )
    result = cursor.fetchone()
    conn.close()
    
    if result:
        return {
            "baseline_id": result[0],
            "aoi_geojson": json.loads(result[1]),
            "baseline_year": result[2],
            "stats": json.loads(result[3]),
            "tile_url": result[4],
            "area_km2": result[5],
            "locked": bool(result[6]),
            "created_at": result[7],
            "locked_at": result[8]
        }
    return None

def save_baseline(baseline_id: str, aoi_geojson: dict, baseline_year: int, stats: dict, tile_url: str, area_km2: float):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO baselines (id, aoi_geojson, baseline_year, stats, tile_url, area_km2) VALUES (?, ?, ?, ?, ?, ?)",
        (baseline_id, json.dumps(aoi_geojson), baseline_year, json.dumps(stats), tile_url, area_km2)
    )
    conn.commit()
    conn.close()

def lock_baseline(baseline_id: str, locked_by: str = "system"):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE baselines SET locked = TRUE, locked_at = ?, locked_by = ? WHERE id = ?",
        (datetime.now().isoformat(), locked_by, baseline_id)
    )
    conn.commit()
    conn.close()

def is_baseline_locked(baseline_id: str) -> bool:
    baseline = get_baseline(baseline_id)
    return baseline["locked"] if baseline else False
