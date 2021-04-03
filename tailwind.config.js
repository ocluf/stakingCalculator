module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      minWidth: {
        '300': '300px',
      },
      maxWidth: {
        "w-logo": '30px'
      },
      colors: {
        "primary": "#4051b5",
        "delete": "#FF000F"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // preflight: false
  },
}
