/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B9FEB5',
          LIGHT: '#DFFFDE',
          DARK: '#13FC04',
          50: '#F2FFF2',
          75: '#E9FFE8',
          100: '#DFFFDE',
          200: '#B9FEB5',
          300: '#93FE8D',
          400: '#6DFD64',
          500: '#47FD3C',
          600: '#13FC04',
          700: '#0DC702',
          800: '#0A8F01',
          900: '#065801'
        }
      },
      spacing: {
        navHeight: '3.7rem',
        catNavHeight: '2.5rem',
        homeNavHeight: '6rem', // navHeight + pageMargin
        notHomeNavHeight: '3.7rem', // navHeight + pageMargin
        pageMargin: '.8rem',
        pageMarginM: '1.6rem',
        pageMarginL: '3rem',
        logoHeight: '2.13rem',
        box: '.5rem',
        main: 'calc(100vh - 6rem)', //'calc(100vh - 3.15rem)',
        notHomeMain: 'calc(100vh - 3.7rem)',
        fieldMT: '1.5rem'
      },
      zIndex: {
        mapButton: '59',
        map: '39',
        listings: '49',
        nav: '59'
      },
      fontSize: {
        '2xs': '.65rem',
        xs: '.75rem',
        sm: '.875rem',
        base: '(var(--baseFontSize), 1rem)',
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
