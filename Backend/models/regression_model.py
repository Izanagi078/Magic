import os
import numpy as np
import tensorflow as tf

def build_regression_model(input_dim):
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(input_dim,)),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(32, activation='relu'),
        tf.keras.layers.Dense(1, activation='linear'),
    ])
    model.compile(
        optimizer='adam',
        loss='mean_squared_error',
        metrics=['mae']        # shorthand for MeanAbsoluteError
    )
    return model

def train_regression(X, y,
                     val_split=0.2,
                     epochs=50,
                     batch_size=32,
                     patience=5):
    """
    Trains on (X, y), returns (model, history).
    """
    model = build_regression_model(X.shape[1])
    early_stop = tf.keras.callbacks.EarlyStopping(
        monitor='val_loss',
        patience=patience,
        restore_best_weights=True
    )
    history = model.fit(
        X, y,
        validation_split=val_split,
        epochs=epochs,
        batch_size=batch_size,
        callbacks=[early_stop],
        verbose=0
    )
    return model, history

def save_model(model, path='saved_models/regressor.h5'):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    model.save(path)
    print(f'[model.py] Saved model to {path}')
