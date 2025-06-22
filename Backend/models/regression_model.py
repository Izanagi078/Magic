import os
import numpy as np
import tensorflow as tf

def build_regression_model(input_dim):
    m = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(input_dim,)),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(32, activation='relu'),
        tf.keras.layers.Dense(1, activation='linear'),
    ])
    m.compile(
        optimizer='adam',
        loss='mean_squared_error',
        metrics=['mae']
    )
    return m

def build_classification_model(input_dim, num_classes):
    m = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(input_dim,)),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(32, activation='relu'),
        tf.keras.layers.Dense(num_classes, activation='softmax'),
    ])
    m.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return m

def train_regression(X, y,
                     validation_data=None,
                     epochs=50,
                     batch_size=32,
                     patience=5):
    """
    X: 2D float array, y: 1D float array.
    """
    model = build_regression_model(X.shape[1])
    es    = tf.keras.callbacks.EarlyStopping(
        monitor='val_loss',
        patience=patience,
        restore_best_weights=True
    )
    history = model.fit(
        X, y,
        validation_data=validation_data,
        epochs=epochs,
        batch_size=batch_size,
        callbacks=[es],
        verbose=0
    )
    return model, history

def train_classification(X, y_labels,
                         validation_data=None,
                         epochs=50,
                         batch_size=32,
                         patience=5):
    """
    X: 2D float array
    y_labels: 1D integer array of class indices
    """
    # one-hot encode
    y_onehot   = tf.keras.utils.to_categorical(y_labels)
    num_classes = y_onehot.shape[1]

    model = build_classification_model(X.shape[1], num_classes)
    es    = tf.keras.callbacks.EarlyStopping(
        monitor='val_loss',
        patience=patience,
        restore_best_weights=True
    )
    history = model.fit(
        X, y_onehot,
        validation_data=validation_data,
        epochs=epochs,
        batch_size=batch_size,
        callbacks=[es],
        verbose=0
    )
    return model, history

def save_model(model, path='saved_models/model.h5'):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    model.save(path)
    print(f'[regression_model] saved model to {path}')
