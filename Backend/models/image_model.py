# models/image_model.py
import tensorflow as tf
import numpy as np

# Access MobileNetV2 and its utilities via attribute access.
mobilenet_module = tf.keras.applications.mobilenet_v2
MobileNetV2 = mobilenet_module.MobileNetV2
preprocess_input = mobilenet_module.preprocess_input
decode_predictions = mobilenet_module.decode_predictions

# Access the image module via attribute access.
keras_image = tf.keras.preprocessing.image

# Load the pre-trained MobileNetV2 model (this might take a moment on first run)
model = MobileNetV2(weights='imagenet')

def classify_image(image_path: str) -> str:
    """
    Use MobileNetV2 to classify the image.
    
    Steps:
    1. Load and resize the image to 224x224.
    2. Convert it to an array and expand dimensions.
    3. Preprocess the image values.
    4. Run prediction and decode the top result.
    """
    # Load and preprocess the image
    img = keras_image.load_img(image_path, target_size=(224, 224))
    img_array = keras_image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    
    # Predict using the model
    preds = model.predict(img_array)
    # Decode the results: returns a list of tuples (class_id, label, probability)
    (imagenetID, label, score) = decode_predictions(preds, top=1)[0][0]
    return f"Prediction: {label} with confidence {score:.2f}"

# Example usage (remove or comment out before deploying as a module)
if __name__ == "__main__":
    image_path = "D:/ML_Work/Magic/Backend/uploads/plane.png.png"
    result = classify_image(image_path)
    print(result)
