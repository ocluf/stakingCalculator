import React from "react"
import { useAppSelector } from "../redux/hooks"
import Banner from "./Banner"
import Chart from "./chart"
import AdvancedSettings from "./input/AdvancedSettings"
import MobileBottomBar from "./MobileBottomBar"
import Neurons from "./Neurons"
import TotalResult from "./TotalResult"

const App = () => {
  const currentNeuron = useAppSelector(state => state.neurons.find(neuron => neuron.id === state.currenNeuronId))
  const chart = (): JSX.Element => {
    if (currentNeuron) {
      return (
        <div className=" invisible bg-white w-full h-full max-w-2xl max-h-96 rounded-lg shadow-lg sm:visible sm:h-0">
          <Chart data={currentNeuron.data}></Chart>
        </div>
      )
    } else {
      return (
        <div className=" w-auto h-auto m-5">
          <div className="bg-white w-full h-full max-w-2xl max-h-96 rounded-lg shadow-lg mx-autos">
            {" "}
            No neuron selected
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <Banner></Banner>
      <Neurons></Neurons>
      {chart()}
      <AdvancedSettings></AdvancedSettings>
      <TotalResult></TotalResult>
      <MobileBottomBar></MobileBottomBar>
    </>
  )
}

export default App
