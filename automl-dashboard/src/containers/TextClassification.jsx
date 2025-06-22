// src/containers/TextClassification.jsx
import React, { useState } from 'react';

const TextClassification = () => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState(null);
  const [error, setError]         = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!inputText.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://localhost:5000/api/text/classify", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ text: inputText.trim() })
      });
      const data = await (res.ok
        ? res.json()
        : res.json().then(err => { throw new Error(err.error || "Server error"); })
      );
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">

      {/* ───────── Hero ───────── */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 overflow-hidden">
        <div className="absolute -right-32 -top-24 w-72 h-72 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white opacity-5 rounded-full"></div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Text Lab
          </h1>
          <p className="text-lg md:text-xl leading-relaxed">
            Harness transformer-based NLP to analyze sentiment, categorize topics, and extract insights 
            from any text—fast, accurate and in one unified workspace.
          </p>
        </div>
        {/* wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <path
              d="M0,0 C600,120 600,0 1200,120 L1200,0 L0,0 Z"
              className="fill-white"
            />
        </div>
      </section>

      {/* ───────── Form ───────── */}
      <section className="py-16">
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6 transform hover:scale-[1.02] transition">
            <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-2">
              Classify Your Text
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Paste or type any snippet below, then click to categorize.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                rows={4}
                className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="Type your text here…"
              />
              <button
                type="submit"
                disabled={loading || !inputText.trim()}
                className="w-full py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Classify Text"}
              </button>
            </form>

            {error && (
              <p className="text-red-500">{error}</p>
            )}

            {result && (
              <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-secondary dark:border-primary">
                <p className="text-xl font-semibold">
                  {Array(result.stars).fill("★").join("")}
                  {Array(5 - result.stars).fill("☆").join("")} ({result.stars}/5)
                </p>
                <p className="capitalize mt-1">{result.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───────── Use Cases ───────── */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-xl font-bold text-center text-primary dark:text-secondary mb-6">
            Common Applications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Sentiment Analysis",
              "Topic Classification",
              "Spam Detection",
              "Intent Recognition"
            ].map((app, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-4 shadow"
              >
                <div className="w-10 h-10 flex-shrink-0 bg-primary dark:bg-secondary text-white rounded-full flex items-center justify-center font-bold">
                  {i+1}
                </div>
                <p>{app}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TextClassification;
