from flask import Flask
from flask_cors import CORS
from controllers.image_controllers import image_bp
from controllers.regression_controller import reg_bp  # added
from controllers.text_controller import text_bp
import os

app = Flask(__name__)
CORS(app)  # Enable CORS if your frontend runs from another origin

# Configure upload folder (used for storing temporary image files)
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.register_blueprint(image_bp, url_prefix='/api')
app.register_blueprint(reg_bp,   url_prefix='/api/regression')  # added
app.register_blueprint(text_bp,  url_prefix="/api/text")
if __name__ == '__main__':
    app.run(debug=True, port=5000)
