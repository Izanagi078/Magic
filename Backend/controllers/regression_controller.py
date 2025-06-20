import io
import os
import numpy as np
import pandas as pd
import tensorflow as tf
from flask import Blueprint, request, jsonify

reg_bp = Blueprint('regression', __name__)
MODEL_PATH = 'saved_models/regressor.h5'


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
        metrics=[ tf.keras.metrics.MeanAbsoluteError(name='mae') ]
    )
    return m


@reg_bp.route('', methods=['POST'])
def train_regression():
    """
    Train on an uploaded CSV:
      - form-data field 'regressionDataset' = full CSV file
      - CSV must have ≥2 columns (features… , target in last col)
    Returns JSON:
      { columns: [...], val_mse, val_mae, epochs_ran }
    """
    if 'regressionDataset' not in request.files:
        return jsonify(error='Missing file field'), 400

    f = request.files['regressionDataset']
    text = f.read().decode('utf-8-sig', errors='ignore')
    df = pd.read_csv(io.StringIO(text), sep=None, engine='python')
    if df.shape[1] < 2:
        return jsonify(error='CSV needs ≥2 columns', shape=df.shape), 400

    data = df.to_numpy(dtype=float)
    X, y = data[:, :-1], data[:, -1]

    # build + train
    model = build_regression_model(X.shape[1])
    es = tf.keras.callbacks.EarlyStopping(
        monitor='val_loss', patience=5, restore_best_weights=True
    )
    hist = model.fit(
        X, y,
        validation_split=0.2,
        epochs=50,
        batch_size=32,
        callbacks=[es],
        verbose=0
    )

    # save
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    model.save(MODEL_PATH)

    return jsonify(
        columns=df.columns.tolist(),
        val_mse=float(hist.history['val_loss'][-1]),
        val_mae=float(hist.history['val_mae'][-1]),
        epochs_ran=len(hist.history['loss'])
    ), 200


@reg_bp.route('/predict-one', methods=['POST'])
def predict_one():
    """
    Predict a single record:
      - JSON body { "features": [f1, f2, …, fN] }
    Returns JSON:
      { prediction: <float> }
    """
    if not request.is_json:
        return jsonify(error='Expecting JSON'), 400

    body = request.get_json()
    feats = body.get('features')
    if not isinstance(feats, list) or len(feats) == 0:
        return jsonify(error='"features" must be non-empty list'), 400

    # reshape to (1, N)
    try:
        arr = np.array(feats, dtype=float).reshape(1, -1)
    except Exception as e:
        return jsonify(error='Invalid feature values', detail=str(e)), 400

    if not os.path.exists(MODEL_PATH):
        return jsonify(error='Model not found; train first'), 500

    model = tf.keras.models.load_model(MODEL_PATH)
    pred  = model.predict(arr, verbose=0).flatten()[0]
    return jsonify(prediction=float(pred)), 200
