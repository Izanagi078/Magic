import React, { useState } from 'react';

const ImageProcessing = () => {
  const [selectedImage, setSelectedImage] = useState(null); // For preview URL
  const [selectedFile, setSelectedFile] = useState(null);   // Holds the actual file
  const [result, setResult] = useState(null);               // To display backend response

  // Handles image upload: create preview and save the file
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setResult(null); // Clear previous prediction results
    }
  };

  // Clears the selected image and result
  const handleClearImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setResult(null);
  };

  // Calls the backend API to run the model on the image
  const handleRunModel = async () => {
    if (!selectedFile) {
      alert("Please upload an image first.");
      return;
    }
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/classify', { // Using 127.0.0.1 for consistency
        method: 'POST',
        body: formData,
      });
      
      // Debugging: log response status and headers (optional)
      console.log("Response status:", response.status);
      
      // Parse JSON response, if any
      const data = await response.json();
      console.log("Response JSON:", data);
      
      if (data.result) {
        setResult(data.result);
      } else if (data.error) {
        setResult(`Error: ${data.error}`);
      } else {
        setResult("No prediction result returned.");
      }
    } catch (error) {
      console.error('Error running the model:', error);
      setResult("Error running the model.");
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
        <label htmlFor="imageUpload" className="block text-gray-600 font-medium mb-2">
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

      {/* Image preview section */}
      {selectedImage && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Preview:</h3>
          <img
            src={selectedImage}
            alt="Uploaded Preview"
            className="w-full max-h-96 object-contain rounded border"
          />
          <button
            onClick={handleClearImage}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Remove Image
          </button>
        </div>
      )}

      {/* Display prediction result */}
      {result && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Result:</h3>
          <p>{result}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <button
          type="button"
          onClick={handleRunModel}
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition duration-200"
        >
          Run Model
        </button>
        <button
          type="button"
          onClick={handleClearImage}
          className="bg-white text-green-500 border border-green-500 px-6 py-3 rounded hover:bg-green-50 transition duration-200"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default ImageProcessing;
