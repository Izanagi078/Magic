// src/containers/ImageProcessing.jsx
import React, { useState } from 'react';

const ImageProcessing = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile]   = useState(null);
  const [result, setResult]               = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setSelectedImage(URL.createObjectURL(file));
    setResult(null);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setResult(null);
  };

  const handleRunModel = async () => {
    if (!selectedFile) {
      alert("Upload an image first.");
      return;
    }
    const form = new FormData();
    form.append('image', selectedFile);

    try {
      const res  = await fetch('http://127.0.0.1:5000/api/classify', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      setResult(data.result || data.error || "No output.");
    } catch {
      setResult("Error running model.");
    }
  };

  return (
    <div className="pt-16 font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">

      {/* ─── Hero ─── */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-16 overflow-hidden">
        <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center space-y-8 md:space-y-0">
          
          {/* Text */}
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
              Image Lab
            </h1>
            <p className="text-lg md:text-xl leading-relaxed">
              Upload your pictures and leverage cutting-edge vision models to classify, detect, or segment—all in one place.
            </p>
          </div>

          {/* Preview Box */}
          <div className="md:w-1/2">
            <div className="w-full h-64 bg-white rounded-xl shadow-inner flex items-center justify-center overflow-hidden">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="object-contain w-full h-full"
                />
              ) : (
                <span className="text-secondary opacity-50">Preview appears here</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Upload & Actions ─── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
            {/* Upload */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Select Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full cursor-pointer text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 
                           border border-gray-300 dark:border-gray-600 rounded-lg p-3"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <button
                onClick={handleRunModel}
                className="flex-1 bg-primary hover:bg-secondary text-white font-semibold py-3 rounded-lg transition"
              >
                Run Model
              </button>
              <button
                onClick={handleClearImage}
                className="flex-1 bg-white dark:bg-gray-700 text-primary dark:text-secondary 
                           border border-primary dark:border-secondary font-semibold py-3 rounded-lg transition"
              >
                Clear
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg 
                              border-l-4 border-secondary dark:border-primary">
                <h3 className="font-semibold text-lg mb-2">Result</h3>
                <p>{result}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImageProcessing;
