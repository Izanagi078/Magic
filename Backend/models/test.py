import tensorflow as tf

# Access the 'image' module from tf.keras.preprocessing via attribute access.
something = tf.keras.preprocessing.image

# Now you can use functions from the module, e.g.:
img = something.load_img('D:/ML_Work/Magic/Backend/uploads/plane.png.png', target_size=(224, 224))
print("Image loaded successfully!")
