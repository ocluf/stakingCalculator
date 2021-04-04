module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      width: {
        addButton: "56px"
      },
      height: {
        bottombar: '56px'
      },
      minWidth: {
        '300': '300px',
      },
      maxWidth: {
        "logo": '35px'
      },
      maxHeight: {
        "logo": '52px'
      },
      colors: {
        "primary": "#4051b5",
        "delete": "#FF000F",
        "blue": "#29ABE2",
        "orange": "#FCB13B"
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
