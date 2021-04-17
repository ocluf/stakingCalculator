import React from "react"
import { useAppSelector } from "../redux/hooks"
import Banner from "./Banner"
import Dashboard from "./Dashboard"
import AdvancedSettings from "./input/AdvancedSettings"
import MobileBottomBar from "./MobileBottomBar"
import Neurons from "./Neurons"
import SEO from "./SEO"

const App = () => {
  const currentNeuron = useAppSelector(state => state.neurons.find(neuron => neuron.id === state.currenNeuronId))

  return (
    <>
      <SEO></SEO>
      <Banner></Banner>
      <div className="lg:flex lg:flex-row lg:mx-auto lg:w-max">
        <Neurons></Neurons>
        <Dashboard></Dashboard>
      </div>
      <AdvancedSettings></AdvancedSettings>
      <div className="h-bottombar"></div>
      <MobileBottomBar></MobileBottomBar>
    </>
  )
}

export default App
