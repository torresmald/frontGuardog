/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'sienna-50': '#faf5f0',
        'sienna-100': '#f2e2d3',
        'sienna-200': '#e3c2a4',
        'sienna-300': '#d59f74',
        'sienna-400': '#c87e4c',
        'sienna-500': '#c06740',
        'sienna-600': '#a94f36',
        'sienna-700': '#8d3a30',
        'sienna-800': '#74302c',
        'sienna-900': '#602a27',
        'sienna-950': '#361412',
      },
      fontFamily: {
        'dog': ['dog', 'sans-serif']
      }
    },
  },
  plugins: [],
}