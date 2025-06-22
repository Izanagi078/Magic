import os
import io
import pickle
import traceback

import numpy as np
import pandas as pd
import tensorflow as tf

from flask import Blueprint, request, jsonify
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

from models.regression_model import (
    train_regression,
    train_classification,
    save_model
)

reg_bp = Blueprint('regression_bp', __name__)

MODEL_PATH    = 'saved_models/model.h5'
ENCODERS_PATH = 'saved_models/encoders.pkl'
ALLOWED_EXT   = {'csv'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXT


@reg_bp.route('', methods=['POST'])
def train():
    # 1) Receive CSV
    if 'regressionDataset' not in request.files:
        return jsonify(error='Missing file field'), 400
    file = request.files['regressionDataset']
    if file.filename == '':
        return jsonify(error='No file selected'), 400
    if not allowed_file(file.filename):
        return jsonify(error='Only CSV allowed'), 400

    try:
        text = file.read().decode('utf-8-sig', errors='ignore')
        df = pd.read_csv(
            io.StringIO(text),
            sep=None,        # sniff the delimiter
            engine='python'  # required for sep=None
        )
    except Exception as e:
        return jsonify(error='Cannot parse CSV', detail=str(e)), 400

    if df.shape[1] < 2:
        return jsonify(error='CSV needs ≥2 cols', shape=df.shape), 400

    # 2) Split features/target
    X_df  = df.iloc[:, :-1].copy()
    y_ser = df.iloc[:, -1].copy()

    # 3) Detect type and encode
    is_class = y_ser.dtype == object or y_ser.dtype.name == 'category'
    encoders = {}

    # encode string features
    for col in X_df.select_dtypes(include=['object','category']).columns:
        le        = LabelEncoder()
        X_df[col] = le.fit_transform(X_df[col].astype(str))
        encoders[col] = le

    # encode target
    if is_class:
        le    = LabelEncoder()
        y_enc = le.fit_transform(y_ser.astype(str))
        encoders['__target__'] = le
    else:
        try:
            y_enc = pd.to_numeric(y_ser, errors='raise').to_numpy()
        except Exception as e:
            return jsonify(error='Non-numeric target', detail=str(e)), 400

    # 4) To numpy arrays
    try:
        X = X_df.to_numpy(dtype=float)
        y = y_enc
    except Exception as e:
        return jsonify(error='Cannot convert to floats', detail=str(e)), 400

    # 5) Random train/validation split
    try:
        if is_class:
            X_train, X_val, y_train, y_val = train_test_split(
                X, y, test_size=0.2, random_state=42, stratify=y
            )
            # one-hot the val labels for validation_data
            y_val_oh = tf.keras.utils.to_categorical(y_val)
            model, hist = train_classification(
                X_train, y_train,
                validation_data=(X_val, y_val_oh)
            )
        else:
            X_train, X_val, y_train, y_val = train_test_split(
                X, y, test_size=0.2, random_state=42
            )
            model, hist = train_regression(
                X_train, y_train,
                validation_data=(X_val, y_val)
            )
    except Exception as e:
        traceback.print_exc()
        return jsonify(error='Training failed', detail=str(e)), 500

    # 6) Save model & encoders
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    save_model(model, MODEL_PATH)
    with open(ENCODERS_PATH, 'wb') as f:
        pickle.dump({
            'is_classification': is_class,
            'label_encoders':    encoders
        }, f)

    # 7) Return metrics
    resp = {
        'columns':    df.columns.tolist(),
        'epochs_ran': len(hist.history['loss'])
    }
    if is_class:
        resp['val_loss']     = float(hist.history['val_loss'][-1])
        resp['val_accuracy'] = float(hist.history['val_accuracy'][-1])
    else:
        resp['val_mse'] = float(hist.history['val_loss'][-1])
        resp['val_mae'] = float(hist.history['mae'][-1])

    return jsonify(resp), 200


@reg_bp.route('/predict-one', methods=['POST'])
def predict_one():
    if not request.is_json:
        return jsonify(error='Expecting JSON'), 400

    body  = request.get_json()
    feats = body.get('features')
    if not isinstance(feats, list) or not feats:
        return jsonify(error='"features" must be non-empty list'), 400

    try:
        arr = np.array(feats, dtype=float).reshape(1, -1)
    except Exception as e:
        return jsonify(error='Invalid feature values', detail=str(e)), 400

    if not os.path.exists(MODEL_PATH) or not os.path.exists(ENCODERS_PATH):
        return jsonify(error='Model not found; train first'), 500

    with open(ENCODERS_PATH, 'rb') as f:
        info = pickle.load(f)

    is_class = info['is_classification']
    encs     = info['label_encoders']
    model    = tf.keras.models.load_model(MODEL_PATH)

    if is_class:
        probs = model.predict(arr, verbose=0)
        idx   = np.argmax(probs, axis=1)[0]
        label = encs['__target__'].inverse_transform([idx])[0]
        return jsonify(prediction=label), 200

    pred = model.predict(arr, verbose=0).flatten()[0]
    return jsonify(prediction=float(pred)), 200
