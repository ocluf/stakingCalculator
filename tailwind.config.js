module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    minWidth: {
      '1': '400px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // preflight: false
  },
}
