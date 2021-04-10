import React from "react"
import logo from "../../static/logo.svg"
import shareIcon from "../../static/greyShareIcon.svg"
import settingsIcon from "../../static/greySettings.svg"
import questionMarkIcon from "../../static/greyFAQ.svg"
import plusSign from "../../static/bigAddButton.svg"
import { navigate } from "gatsby"
import { addNeuron, toggleAdvanced } from "../redux/store"
import { useDispatch } from "react-redux"

const Banner = () => {
  const dispatch = useDispatch()

  return (
    <div className="bg-white p-4 flex flex-row justify-center lg:justify-start shadow-md">
      <img src={logo} className="max-w-logo max-h-logo" />
      <div className="ml-4 w-max">
        <h1 className="font-semi-bold"> ICP NEURON CALCULATOR</h1>
        <h2 className="text-xs">Maximize your Vote, Maximize your ICP</h2>
      </div>
      <div className="hidden lg:flex lg:flex-row ml-auto space-x-4 ">
        <img src={shareIcon} className="ml-auto cursor-pointer" />
        <img src={settingsIcon} className="cursor-pointer" onClick={() => dispatch(toggleAdvanced())} />
        <img
          src={questionMarkIcon}
          className="cursor-pointer"
          onClick={() => {
            navigate("/FAQ")
          }}
        />
        <img src={plusSign} className="cursor-pointer" onClick={() => dispatch(addNeuron())} />
      </div>
    </div>
  )
}

export default Banner
