import React from "react"
import logo from "../../static/logo.svg"

const Banner = () => {
  return (
    <div className="bg-white p-4 flex flex-row justify-center shadow-md">
      <img src={logo} className="max-w-logo" />
      <div className="ml-4 w-max">
        <h1 className="text-lg font-semi-bold"> ICP NEURON CALCULATOR</h1>
        <h2 className="text-md">Maximize your Voting Power, Maximize your ICP</h2>
      </div>
    </div>
  )
}

export default Banner
