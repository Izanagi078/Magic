import React, { useState } from 'react';
const API = 'http://127.0.0.1:5000/api/regression';

export default function Regression() {
  // STEP 1: Training
  const [file, setFile]     = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [cols, setCols]       = useState([]);

  // STEP 2: Single-record predict
  const [values, setValues]   = useState({});
  const [predicting, setPredicting] = useState(false);
  const [predError, setPredError]   = useState('');
  const [prediction, setPrediction] = useState(null);

  // 1) Handle CSV selection
  const onFileChange = e => {
    setFile(e.target.files[0]);
    setCols([]);
    setPrediction(null);
    setError('');
  };

  // 2) Upload & train
  const onTrain = async e => {
    e.preventDefault();
    if (!file) {
      setError('Please select a CSV.');
      return;
    }
    setLoading(true);
    const fd = new FormData();
    fd.append('regressionDataset', file);

    try {
      const res  = await fetch(API, { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Training failed');
      // drop the last column (target) to get feature names
      setCols(data.columns.slice(0, -1));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3) Handle typing in feature inputs
  const onValueChange = (col, v) => {
    setValues(vals => ({ ...vals, [col]: v }));
  };

  // 4) Predict one row
  const onPredict = async e => {
    e.preventDefault();

    // collect feature array in order
    let arr = [];
    try {
      for (let col of cols) {
        const v = values[col];
        if (v === undefined || v === '') {
          throw new Error(`Value for "${col}" required`);
        }
        arr.push(parseFloat(v));
      }
    } catch (err) {
      setPredError(err.message);
      return;
    }

    setPredicting(true);
    setPredError('');
    try {
      const res  = await fetch(`${API}/predict-one`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: arr })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Prediction failed');
      setPrediction(data.prediction);
    } catch (err) {
      setPredError(err.message);
    } finally {
      setPredicting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-6">
      {/* STEP 1: Train */}
      {!cols.length && (
        <form onSubmit={onTrain} className="space-y-4">
          <h2 className="text-xl font-bold">1. Upload CSV & Train</h2>
          <input type="file" accept=".csv" onChange={onFileChange} />
          {error && <p className="text-red-500">{error}</p>}
          <button
            disabled={loading}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? 'Training…' : 'Train Model'}
          </button>
        </form>
      )}

      {/* STEP 2: Predict */}
      {cols.length > 0 && (
        <form onSubmit={onPredict} className="space-y-4">
          <h2 className="text-xl font-bold">2. Enter Features & Predict</h2>
          {cols.map(col => (
            <div key={col}>
              <label className="block font-medium">{col}</label>
              <input
                type="number"
                step="any"
                onChange={e => onValueChange(col, e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          ))}
          {predError && <p className="text-red-500">{predError}</p>}
          <button
            disabled={predicting}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {predicting ? 'Predicting…' : 'Get Prediction'}
          </button>
          {prediction !== null && (
            <div className="mt-4 p-3 bg-gray-100 rounded">
              <strong>Predicted Quality:</strong> {prediction.toFixed(2)}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
