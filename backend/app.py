from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from services.chm_inference import run_chm_inference

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
# Sabhi origins allow kiye taaki React (3000) aur Flask (5000) baat kar sakein
CORS(app)

@app.route('/api/chm/predict', methods=['POST'])
def analyze_chm():
    try:
        data = request.json
        if not data:
            return jsonify({"status": "error", "message": "No payload received"}), 400

        # Frontend sends 'geojson', fallback to 'polygon' for flexibility
        polygon = data.get('geojson') or data.get('polygon')
        year = data.get('year', 2026) # Default to 2026

        if not polygon:
            return jsonify({"status": "error", "message": "No boundary (geojson) provided"}), 400

        logger.info(f"🚀 Running Analysis for Year: {year}")
        
        # Execute the heavy processing logic
        result = run_chm_inference(polygon, year)

        # Check if the internal service reported an error
        if result.get("status") == "error":
            logger.error(f"❌ Inference Error: {result.get('message')}")
            return jsonify(result), 500

        return jsonify(result), 200

    except Exception as e:
        logger.error(f"❌ Server Exception: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    # Running on 0.0.0.0 makes it accessible on your local network
    app.run(host='0.0.0.0', port=5000, debug=True)