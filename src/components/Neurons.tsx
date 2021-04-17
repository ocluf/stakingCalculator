import React from "react"
import { useAppSelector } from "../redux/hooks"
import Neuron from "./Neuron"

const Neurons = () => {
  const neurons = useAppSelector(state => state.neurons)
  const globalParameters = useAppSelector(state => state.globalParameters)

  return (
    <div>
      <div className="w-max mx-auto">
        {neurons.map((neuron, index) => (
          <Neuron key={neuron.id} neuron={neuron} globalParameters={globalParameters} index={index}></Neuron>
        ))}
      </div>
    </div>
  )
}

export default Neurons
