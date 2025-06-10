// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './containers/Dashboard';
import ImageProcessing from './containers/ImageProcessing';
import TextClassification from './containers/TextClassification';
import Regression from './containers/Regression';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-green-50">
        {/* Header */}
        <header className="bg-green-700 text-white py-8 shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
                  AutoML Model Selection & Efficiency Dashboard
                </h1>
                <p className="mt-3 text-lg text-green-200">
                  Empowering data-driven decisions through automated model benchmarking.
                </p>
              </div>
              <nav className="mt-6 md:mt-0">
                <ul className="flex flex-wrap md:flex-nowrap space-x-4">
                  <li>
                    <NavLink
                      to="/"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 font-semibold transition-all duration-200"
                          : "text-white hover:text-black transition-all duration-200"
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/image-processing"
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 font-semibold transition-all duration-200"
                          : "text-white hover:text-black transition-all duration-200"
                      }
                    >
                      Image Processing
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/text-classification"
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 font-semibold transition-all duration-200"
                          : "text-white hover:text-black transition-all duration-200"
                      }
                    >
                      Text Classification
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/regression"
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 font-semibold transition-all duration-200"
                          : "text-white hover:text-black transition-all duration-200"
                      }
                    >
                      Regression
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-md">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/image-processing" element={<ImageProcessing />} />
              <Route path="/text-classification" element={<TextClassification />} />
              <Route path="/regression" element={<Regression />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-green-700 text-white py-6 mt-8">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm">&copy; 2025 My AutoML Dashboard. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a
                href="/docs"
                className="text-green-200 hover:text-black text-sm transition-colors duration-200"
              >
                Documentation
              </a>
              <a
                href="/contact"
                className="text-green-200 hover:text-black text-sm transition-colors duration-200"
              >
                Contact Us
              </a>
              <a
                href="/privacy"
                className="text-green-200 hover:text-black text-sm transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
