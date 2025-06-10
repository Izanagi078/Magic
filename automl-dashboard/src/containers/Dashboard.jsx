// src/containers/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Welcome to the Next Generation AutoML Platform
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Upload your dataset and get optimized suggestions tailored to your ML needs. Whether it&apos;s image processing, text classification, or regression, we&apos;ve got you covered.
          </p>
          <Link
            to="/image-processing"
            className="inline-block bg-white text-teal-600 font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Snapshot */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-3">Multi-Domain Support</h3>
              <p className="text-gray-600">
                Explore image, text, regression, and more with domain-specific models.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-3">Model Benchmarking</h3>
              <p className="text-gray-600">
                Compare models with metrics like accuracy, execution time, and memory usage.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-3">AI-Powered Recommendations</h3>
              <p className="text-gray-600">
                Receive suggestions for the best model based on comprehensive experiments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <ol className="list-decimal list-inside space-y-4 text-lg text-gray-700">
            <li>
              <span className="font-semibold">Upload Data:</span> Begin by uploading your dataset.
            </li>
            <li>
              <span className="font-semibold">Benchmark Models:</span> We run multiple models concurrently.
            </li>
            <li>
              <span className="font-semibold">Review Metrics:</span> Easily compare performance metrics.
            </li>
            <li>
              <span className="font-semibold">Get Recommendations:</span> Our system suggests the best model for your data.
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default Home;
