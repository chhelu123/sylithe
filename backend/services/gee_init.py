# services/gee_init.py

import ee

_GEE_INITIALIZED = False
GEE_PROJECT = "syltihe"   

def init_gee():
    global _GEE_INITIALIZED

    if _GEE_INITIALIZED:
        return

    try:
        ee.Initialize(project=GEE_PROJECT)
        print(f"✅ GEE initialized with project: {GEE_PROJECT}")
        _GEE_INITIALIZED = True
    except Exception as e:
        raise RuntimeError(
            "❌ Earth Engine initialization failed.\n"
            "Checklist:\n"
            "1. Run: earthengine authenticate\n"
            "2. Earth Engine API is enabled in project 'syltihe'\n"
            f"\nDetails: {e}"
        )
