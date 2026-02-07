# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from services.chm_inference import run_chm_inference

app = Flask(__name__)
CORS(app)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status":"ok"})

@app.route("/chm/predict", methods=["POST"])
def predict_chm():
    payload = request.get_json()

    if not payload or "geojson" not in payload:
        return jsonify({"status":"error","message":"No geometry"}), 400

    geojson = payload["geojson"]
    year = int(payload.get("year", 2023))  # ✅ NEW

    result = run_chm_inference(geojson, year)
    return jsonify(result)

if __name__ == "__main__":
    app.run(port=5001, debug=True)
