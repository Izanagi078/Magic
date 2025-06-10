// src/containers/Regression.jsx
import React from 'react';

const Regression = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Regression Analysis</h2>
      <p className="text-gray-700 mb-6">
        Upload your dataset (CSV format) for regression analysis. Our system will process your data and provide performance metrics.
      </p>
      <form className="space-y-4">
        <div>
          <label htmlFor="regressionDataset" className="block text-gray-600 font-semibold">
            Upload Dataset (CSV)
          </label>
          <input
            id="regressionDataset"
            type="file"
            accept=".csv"
            className="mt-1 block w-full rounded border-gray-300"
          />
        </div>
        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-200"
        >
          Run Regression
        </button>
      </form>
    </div>
  );
};

export default Regression;
