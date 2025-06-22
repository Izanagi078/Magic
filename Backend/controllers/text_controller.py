# controllers/text_controller.py
from flask import Blueprint, request, jsonify
from models.text_model import classify_text

text_bp = Blueprint("text_bp", __name__)

@text_bp.route("/classify", methods=["POST"])
def classify():
    payload = request.get_json() or {}
    text    = payload.get("text", "").strip()
    if not text:
        return jsonify({"error": "No text provided."}), 400

    result = classify_text(text)
    return jsonify(result), 200
