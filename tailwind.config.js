/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          150: 'rgb(239,253,244)',
          850: '#336950',
          1000: 'rgb(33,78,52)',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.center-all': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.accordion': {
          overflow: 'hidden',
          transition: 'max-height 0.2s ease-out',
          height: 'auto',
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
