/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  flags: { PRESERVE_WEBPACK_CACHE: true },
  siteMetadata: {
    title: "ICP Neuron Calculator",
    description: "A calculator to help you calculate your potential return when participating in the Network Nervous System.",
    url: "https://networknervoussystem.com/",
    image: "logo.svg"
  },
  plugins: [`gatsby-plugin-material-ui`, `gatsby-plugin-postcss`, `gatsby-plugin-react-helmet`],
}
