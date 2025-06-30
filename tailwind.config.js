/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'primary' : {
          '50' : '#E6F2FE',
          '100' : '#CEE5FD',
          '200' : '#9CCCFC',
          '300' : '#6BB2FA',
          '400' : '#3A98F8',
          '500' : '#087FF7',
          '600' : '#0765C5',
          '700' : '#054C94',
          '800' : '#033363',
          '900' : '#021931',
          '950' : '#010D19',
        },
      },
      fontFamily: {
        'montserrat': ['Montserrat'],
      },
    },
  },
  plugins: [],
}

