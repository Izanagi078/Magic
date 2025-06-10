// src/containers/ImageProcessing.jsx
import React, { useState } from 'react';

const ImageProcessing = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-green-700">
        Image Processing Models
      </h2>
      <p className="text-gray-700 mb-6">
        Here, you'll find options to run, compare, and visualize image processing ML models.
      </p>

      <div className="mb-6">
        <label
          htmlFor="imageUpload"
          className="block text-gray-600 font-medium mb-2"
        >
          Upload an image for processing:
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-gray-700 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
        />
      </div>

      {selectedImage && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Preview:</h3>
          <img
            src={selectedImage}
            alt="Uploaded Preview"
            className="w-full max-h-96 object-contain rounded border"
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <button
          type="button"
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition duration-200"
        >
          Run Model
        </button>
        <button
          type="button"
          className="bg-white text-green-500 border border-green-500 px-6 py-3 rounded hover:bg-green-50 transition duration-200"
        >
          View Results
        </button>
      </div>
    </div>
  );
};

export default ImageProcessing;
