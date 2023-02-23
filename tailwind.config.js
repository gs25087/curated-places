/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
