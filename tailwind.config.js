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
      },
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }

        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }

        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      backgroundImage: {
        'home': "url('https://res.cloudinary.com/dpyvlsksj/image/upload/v1698747339/jcqtvlyhi2goe6h33bac.avif')",
        'logo': "url('https://res.cloudinary.com/dpyvlsksj/image/upload/v1698750803/vi2epjqi35gsv6gw1maq.jpg')"
      }
    },
  },
  plugins: [require('tailwindcss-animated')
  ],
}

