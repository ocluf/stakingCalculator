module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      spacing: {
        twopx: "2px",
        dashboard: "760px",
        chart: "712px"
      },
      height: {
        bottombar: '56px',
        chart: "300px"
      },
      minWidth: {
        '300': '300px',
      },
      minHeight: {
        dashboard: "800px"
      },
      maxWidth: {
        "logo": '35px',
        "dashboard": "760px",
        "smallDashboard": "670px"
      },
      maxHeight: {
        "logo": '52px'
      },
      colors: {
        "ligthGrey": "#F7F7F7",
        "checkboxGrey": "#999999",
        "mediumGrey": "#AEAEAE",
        "darkGrey": "#5E5E5E",
        "primary": "#4051b5",
        "delete": "#FF000F",
        "blue": "#29ABE2",
        "orange": "#FCB13B"
      },
      width: {
        "neuron": "366px"
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
