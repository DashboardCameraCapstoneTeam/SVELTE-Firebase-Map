/* eslint-disable quote-props */
/* eslint-disable global-require */
const production = !process.env.ROLLUP_WATCH;
module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: [
      './src/**/*.svelte',
      './node_modules/tw-elements/dist/js/**/*.js',
    ],
    enabled: production, // disable purge in dev
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        // Simple 8 row grid
        '12': 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin'),
  ],
};
