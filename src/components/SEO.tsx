import React from "react"
import { Helmet } from "react-helmet"
import ogImage from "../../static/preview.png"

const SEO = () => {
  return (
    <Helmet
      title="ICP Neuron Calculator"
      meta={[
        {
          property: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          property: `twitter:title`,
          content: `ICP Neuron Calculator`,
        },
        {
          property: `twitter:description`,
          content: `A tool to calculate you neuron rewards`,
        },
        {
          property: `twitter:site`,
          content: `@NNSystem`,
        },
        {
          property: `twitter:creator`,
          content: `@NNSystem`,
        },
        {
          property: `twitter:image`,
          content: `https://angry-davinci-aaea5b.netlify.app${ogImage}`,
        },
        {
          property: `og:title`,
          content: "ICP Neuron Calculator",
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: `https://angry-davinci-aaea5b.netlify.app${ogImage}`, //TODO make dynamic
        },
      ]}
    />
  )
}

export default SEO
