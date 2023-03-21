/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sofia': ['Sofia Sans', 'sans-serif'],
        'fira': ['Fira Sans', 'sans-serif']
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
