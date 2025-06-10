// src/containers/TextClassification.jsx
import React, { useState } from 'react';

const TextClassification = () => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // For now, just display an alert. Later, integrate with your ML backend.
    alert(`Submitted text: ${inputText}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Text Classification</h2>
      <p className="text-gray-700 mb-6">
        Enter text for classification. Our system will analyze the content and provide predicted categories.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="inputText" className="block text-gray-600 font-semibold">
            Enter Text
          </label>
          <textarea
            id="inputText"
            value={inputText}
            onChange={(evt) => setInputText(evt.target.value)}
            rows="4"
            className="mt-1 block w-full rounded border-gray-300"
            placeholder="Type your text here..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-200"
        >
          Classify Text
        </button>
      </form>
    </div>
  );
};

export default TextClassification;
