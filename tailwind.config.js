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
          650: 'rgb(41, 95,61)',
          850: '#336950',
          1000: 'rgb(33,78,52)',
        },
      },
      width: {
        accordion: '256px',
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
        '.sidebarAccordion': {
          overflow: 'hidden',
          transition: 'max-width 0.2s ease-out',
          width: '256px',
          left: '64px',
        },
        '.sidebarDimensions': {
          minWidth: '64px',
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
