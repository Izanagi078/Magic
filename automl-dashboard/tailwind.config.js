// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [ './src/**/*.{js,jsx,ts,tsx}', './public/index.html' ],
  theme: {
    extend: {
      colors: {
        primary:   '#14B8A6',
        secondary: '#0F766E',
      },
      keyframes: {
        fadeInDown: {
          '0%':   { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)'      },
        },
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
