from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

# This matches the function name in services/chm_inference.py
from services.chm_inference import run_chm_inference

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Enable CORS so your React frontend (port 5173/3000) can talk to this backend
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/chm/analyze', methods=['POST'])
def analyze_chm():
    try:
        data = request.json
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400

        # Extract polygon and year from the request
        polygon = data.get('polygon')
        year = data.get('year', 2021) # Default to 2021 if not specified

        if not polygon:
            return jsonify({"status": "error", "message": "No polygon boundary provided"}), 400

        logger.info(f"🚀 Running CHM Analysis for year: {year}")

        # Execute the inference logic
        result = run_chm_inference(polygon, year)

        if result:
            # Successfully returning the hierarchy: Area -> Lidar -> Eligibility -> Biomass
            return jsonify(result), 200
        else:
            return jsonify({
                "status": "error", 
                "message": "GEE returned no data for this boundary/year. Try a larger area."
            }), 404

    except Exception as e:
        logger.error(f"❌ Server Error: {str(e)}")
        return jsonify({
            "status": "error", 
            "message": f"Internal Server Error: {str(e)}"
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "Sylithe CHM Engine"}), 200

if __name__ == '__main__':
    # Running on port 5000
    print("✨ Sylithe Backend active on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)