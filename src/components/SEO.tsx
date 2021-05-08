import React from "react"
import { Helmet } from "react-helmet"
import ogImage from "../../static/preview.png"

const SEO = () => {
  return (
    <Helmet
      title="ICP Neuron Calculator"
      meta={[
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:title`,
          content: `ICP Neuron Calculator`,
        },
        {
          name: `twitter:description`,
          content: `The Internet Computer is the world’s first blockchain that runs at web speed with unlimited capacity. Neurons are utilized to participate in network governance in exchange for ICP rewards.`,
        },
        {
          name: `twitter:site`,
          content: `@NNSystem`,
        },
        {
          property: `twitter:creator`,
          content: `@NNSystem`,
        },
        {
          property: `twitter:image`,
          content: `https://networknervoussystem.com${ogImage}`,
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
          content: `https://networknervoussystem.com${ogImage}`,
        },
      ]}
    />
  )
}

export default SEO
