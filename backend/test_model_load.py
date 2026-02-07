import joblib

model = joblib.load("models/Sylithe_BayesOpt_Model.pkl")
print("✅ Model loaded:", type(model))
