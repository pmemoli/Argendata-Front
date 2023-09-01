/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sofia': ['Sofia Sans', 'sans-serif'],
        'fira': ['Fira Sans', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
      },

      colors: {
        slate: {
          850: 'hsl(217, 33%, 16.5%)',
        }
      },

      screens: {
        'xl15': '1370px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
