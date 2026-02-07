import ee
from services.gee_init import init_gee

init_gee()

print("✅ GEE is working")
print("Image count:",
      ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").size().getInfo())
