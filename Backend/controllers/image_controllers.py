import os
import traceback
from flask import Blueprint, request, jsonify, current_app
from models.image_model import classify_image
from werkzeug.utils import secure_filename

image_bp = Blueprint('image_bp', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@image_bp.route('/classify', methods=['POST'])
def classify():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']
    
    if file.filename == '':
        return jsonify({'error': 'No image file selected'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type. Allowed types are png, jpg, jpeg, gif.'}), 400

    filename = secure_filename(file.filename)
    upload_folder = current_app.config.get('UPLOAD_FOLDER', './uploads')
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, filename)
    
    try:
        file.save(file_path)
        result = classify_image(file_path)
        return jsonify({'result': result}), 200
    except Exception as e:
        # Print the full traceback to the server console
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500
