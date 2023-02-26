/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9AE723',
          DARK: '#182604',
          50: '#E6F9C9',
          100: '#DEF7B6',
          200: '#CDF391',
          300: '#BCEF6D',
          400: '#ABEB48',
          500: '#9AE723',
          600: '#7BBD15',
          700: '#5A8B0F',
          800: '#39580A',
          900: '#182604'
        }
      },
      spacing: {
        navHeight: '3.15rem',
        catNavHeight: '2.5rem',
        homeNavHeight: '7.5rem',
        notHomeNavHeight: '4.5rem',
        pageMargin: '.5rem',
        box: '.5rem',
        main: 'calc(100vh - 3.15rem)'
      },
      zIndex: {
        mapButton: '59',
        map: '39',
        listings: '49',
        nav: '59'
      },
      fontSize: {
        '2xs': '.5rem',
        xs: '.75rem',
        sm: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwind-scrollbar')]
};
