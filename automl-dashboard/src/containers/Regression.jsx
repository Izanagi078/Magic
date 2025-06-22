// src/containers/Regression.jsx
import React, { useState } from 'react'

const API = 'http://127.0.0.1:5000/api/regression'

const Regression = () => {
  // STEP 1: Training
  const [file, setFile]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [cols, setCols]       = useState([])

  // STEP 2: Single‐record predict
  const [values, setValues]     = useState({})
  const [predicting, setPredicting] = useState(false)
  const [predError, setPredError]   = useState('')
  const [prediction, setPrediction] = useState(null)

  // Handlers
  const onFileChange = e => {
    setFile(e.target.files[0])
    setCols([])
    setPrediction(null)
    setError('')
  }

  const onTrain = async e => {
    e.preventDefault()
    if (!file) return setError('Please select a CSV file.')
    setLoading(true)
    const fd = new FormData()
    fd.append('regressionDataset', file)

    try {
      const res  = await fetch(API, { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Training failed')
      setCols(data.columns.slice(0, -1))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const onValueChange = (col, v) => {
    setValues(vals => ({ ...vals, [col]: v }))
  }

  const onPredict = async e => {
    e.preventDefault()
    let arr = []
    try {
      for (let col of cols) {
        const v = values[col]
        if (v === undefined || v === '') {
          throw new Error(`Value for "${col}" required`)
        }
        arr.push(parseFloat(v))
      }
    } catch (err) {
      return setPredError(err.message)
    }

    setPredicting(true)
    setPredError('')
    try {
      const res  = await fetch(`${API}/predict-one`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: arr })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Prediction failed')

      const raw = data.prediction
      const num = parseFloat(raw)
      setPrediction(isNaN(num) ? raw : num)
    } catch (err) {
      setPredError(err.message)
    } finally {
      setPredicting(false)
    }
  }

  return (
    <div className="font-sans antialiased pt-16">
      {/* ─────────── Hero ─────────── */}
      <section className="relative flex items-center justify-center min-h-[40vh] bg-gradient-to-br from-primary to-secondary overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute -right-24 -top-24 w-72 h-72 bg-white opacity-10 rounded-full animate-pulse"></div>

        <div className="z-10 text-center px-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Regression Module
          </h1>
          <p className="text-lg md:text-xl text-teal-100 leading-relaxed">
            Upload your CSV to train a regression model, then enter
            custom values to forecast numeric outcomes in real time.
          </p>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
          <svg
            className="relative block w-[calc(200%+1px)] h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C600,120 600,0 1200,120 L1200,0 L0,0 Z"
              className="fill-white"
            />
          </svg>
        </div>
      </section>

      {/* ─────────── Regression Forms ─────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">
            Get Started
          </h2>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {/* ─────── Step 1: Upload & Train ───────── */}
            <div className="bg-gray-50 rounded-2xl p-6 text-center shadow transition-shadow hover:shadow-2xl">
              <svg
                className="mx-auto mb-4 w-12 h-12 text-secondary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5 5 5M12 5v12"
                />
              </svg>
              <h3 className="text-2xl font-semibold mb-4">1. Upload & Train</h3>
              <form onSubmit={onTrain} className="space-y-4">
                <input
                  type="file"
                  accept=".csv"
                  onChange={onFileChange}
                  className="block w-full text-sm text-gray-500
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-full file:border-0
                             file:text-sm file:font-semibold
                             file:bg-primary file:text-white
                             hover:file:bg-primary-light"
                />
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                  disabled={loading}
                  className="w-full py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded"
                >
                  {loading ? 'Training…' : 'Train Model'}
                </button>
              </form>
            </div>

            {/* ─────── Step 2: Predict ───────── */}
            <div className="bg-gray-50 rounded-2xl p-6 text-center shadow transition-shadow hover:shadow-2xl">
              <svg
                className="mx-auto mb-4 w-12 h-12 text-secondary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h4l3 8 4-16 3 8h4"
                />
              </svg>
              <h3 className="text-2xl font-semibold mb-4">2. Predict</h3>

              {cols.length === 0 ? (
                <p className="text-gray-600">
                  Train your model first to unlock prediction.
                </p>
              ) : (
                <form onSubmit={onPredict} className="space-y-4">
                  <div className="grid gap-4">
                    {cols.map(col => (
                      <div key={col} className="text-left">
                        <label className="block text-sm font-medium text-gray-700">
                          {col}
                        </label>
                        <input
                          type="number"
                          step="any"
                          onChange={e => onValueChange(col, e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm
                                     focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                      </div>
                    ))}
                  </div>
                  {predError && (
                    <p className="text-red-600 text-sm">{predError}</p>
                  )}
                  <button
                    disabled={predicting}
                    className="w-full py-2 bg-secondary hover:bg-secondary-dark text-white font-medium rounded"
                  >
                    {predicting ? 'Predicting…' : 'Get Prediction'}
                  </button>
                </form>
              )}

              {prediction !== null && (
                <div className="mt-6 p-4 bg-white border border-gray-200 rounded">
                  <p className="text-lg font-medium text-gray-800">
                    Prediction Result
                  </p>
                  <p className="mt-2 text-2xl font-bold text-primary">
                    {typeof prediction === 'number'
                      ? prediction.toFixed(2)
                      : prediction}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Regression
