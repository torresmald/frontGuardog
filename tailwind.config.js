/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'sienna': {
          '50': '#faf5f0',
          '100': '#f2e2d3',
          '200': '#e3c2a4',
          '300': '#d59f74',
          '400': '#c87e4c',
          '500': '#c06740',
          '600': '#a94f36',
          '700': '#8d3a30',
          '800': '#74302c',
          '900': '#602a27',
          '950': '#361412',
        },
        'york': {
          '50': '#f1f8f1',
          '100': '#deeedd',
          '200': '#beddbd',
          '300': '#7ab87d',
          '400': '#62a568',
          '500': '#41884a',
          '600': '#2f6c37',
          '700': '#25572d',
          '800': '#204526',
          '900': '#1b3920',
          '950': '#0e2012',
        },


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
        'home': "url('https://res.cloudinary.com/dpyvlsksj/image/upload/v1698747339/Guardog/jcqtvlyhi2goe6h33bac.avif')",
        'logo': "url('https://res.cloudinary.com/dpyvlsksj/image/upload/v1699454405/Guardog/logo_bb0zi4.png')",
        'not-found': "url('https://res.cloudinary.com/dpyvlsksj/image/upload/v1699456229/Guardog/404_uqk1lk.avif')",
        'register': "url('https://res.cloudinary.com/dpyvlsksj/image/upload/v1699606920/Guardog/khnqru5uhmcvdxr7s5zc.png')",
        'cart': "url('https://res.cloudinary.com/dpyvlsksj/image/upload/v1699803727/Guardog/bag_fhmkql.svg')"
      }
    },
  },
  plugins: [require('tailwindcss-animated'), require('flowbite/plugin')

  ],
}

