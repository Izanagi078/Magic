// src/containers/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="font-sans antialiased pt-16">

      {/* ─────────── Hero ─────────── */}
      <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-primary to-secondary overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-white opacity-10 rounded-full animate-pulse"></div>

        <div className="z-10 text-center px-4 max-w-3xl">
          <p className="text-lg md:text-2xl text-teal-100 leading-relaxed">
            At MARTINO, we combine transformer-powered language understanding, convolutional vision models,   
            and robust regression techniques to deliver deep insights across text, image and numeric data.  
            Our unified platform empowers you to analyze sentiment, recognize patterns in images, and build predictive systems—all from one intuitive interface.
          </p>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
          <svg
            className="relative block w-[calc(200%+1px)] h-40"
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

      {/* ─────────── Features ─────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">
            Key Features
          </h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Multi-Domain Magic",
                desc: "One platform for text classification, image recognition & CSV-driven regression.",
                icon: (
                  <svg className="w-12 h-12 text-secondary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h3m10 0h3a1 1 0 011 1v3M3 20a1 1 0 
                       001 1h3m10 0h3a1 1 0 001-1v-3M8 8h8v8H8V8z" />
                  </svg>
                )
              },
              {
                title: "Real-Time Insights",
                desc: "Run fast predictions on uploaded data including .csv, images, or raw text.",
                icon: (
                  <svg className="w-12 h-12 text-secondary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20.5c4.142 
                       0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5-7.5 
                       3.358-7.5 7.5 3.358 7.5 7.5 7.5z" />
                  </svg>
                )
              },
              {
                title: "AI-Powered Automation",
                desc: "Behind the scenes, our engine routes input to the best-fit model—be it NLP, CNN, or regression.",
                icon: (
                  <svg className="w-12 h-12 text-secondary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4m1 6a9 9 0 11-18 
                       0 9 9 0 0118 0z" />
                  </svg>
                )
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 text-center shadow transition-shadow hover:shadow-2xl">
                {feature.icon}
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── How It Works ─────────── */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">
            How It Works
          </h2>
          <div className="space-y-10">
            {[
              { step: 1, title: "Upload Data", desc: "Drag & drop files—images, text, or CSVs—for analysis." },
              { step: 2, title: "Choose Task Type", desc: "Select whether you want classification, regression, or sentiment analysis." },
              { step: 3, title: "Run Inference", desc: "Models execute in real-time, returning results specific to the data type." },
              { step: 4, title: "View Results Instantly", desc: "Predictions, scores, and insights are displayed clearly in the app dashboard." }
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary text-white font-bold rounded-full text-xl">
                    {step}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-1">{title}</h3>
                  <p className="text-gray-700">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
