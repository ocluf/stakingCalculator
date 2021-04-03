import React from "react"
import { useAppSelector } from "../redux/hooks"
import Chart from "./chart"
import AdvancedSettings from "./input/AdvancedSettings"
import Neurons from "./Neurons"
import TotalResult from "./TotalResult"

const App = () => {
  const largeScreen = useAppSelector(state => state.largeScreen)
  const currentNeuron = useAppSelector(state => state.neurons.find(neuron => neuron.id === state.currenNeuronId))
  const chart = (): JSX.Element => {
    if (!largeScreen) {
      return null
    } else if (currentNeuron) {
      return (
        <div className="bg-white w-96 h-96 m-5">
          <Chart data={currentNeuron.data}></Chart>
        </div>
      )
    } else {
      return <div className="bg-white w-96 h-96 m-5"> No neuron selected</div>
    }
  }

  return (
    <>
      <div className="sm:flex flex-row">
        <Neurons></Neurons>
        {chart()}
      </div>
      <div className="sm:flex flex-row">
        <AdvancedSettings></AdvancedSettings>
        <TotalResult></TotalResult>
      </div>
    </>
  )
}

export default App
