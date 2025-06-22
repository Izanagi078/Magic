// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import Home               from './containers/Dashboard';
import ImageProcessing    from './containers/ImageProcessing';
import TextClassification from './containers/TextClassification';
import Regression         from './containers/Regression';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">

        {/* ─────── Hero Header ─────── */}
{/* ─────── Hero Header ─────── */}
<header className="relative z-50 bg-gradient-to-br from-primary to-secondary text-white py-12 shadow-2xl animate-fade-in-down">
  <div
    className="
      max-w-4xl mx-auto px-6
      flex flex-col md:flex-row items-center justify-between
      transition-transform duration-500 hover:scale-105
    "
  >
    {/* Brand */}
    <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-wide">
      MARTINO
    </h1>

    {/* Nav */}
    <nav className="mt-6 md:mt-0">
      <ul className="flex space-x-6">
        {[
          { to: '/',                    label: 'Home',        end: true },
          { to: '/image-processing',    label: 'Image'             },
          { to: '/text-classification', label: 'Text'              },
          { to: '/regression',          label: 'Regression'        }
        ].map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive
                  ? 'text-secondary font-semibold'
                  : 'text-white hover:text-teal-200 transition'
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </div>
</header>



        {/* ─────── Main Content ─────── */}
        <main className="flex-grow -mt-12 mb-12 px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/image-processing" element={<ImageProcessing />} />
              <Route path="/text-classification" element={<TextClassification />} />
              <Route path="/regression" element={<Regression />} />
            </Routes>
          </div>
        </main>

        {/* ─────── Footer ─────── */}
        <footer className="bg-gradient-to-br from-secondary to-primary text-white py-6">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm">
            © 2025 MARTINO. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
