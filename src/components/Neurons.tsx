import { Button } from "@material-ui/core"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { GlobalParameters, NeuronType } from "../types"
import { useAppSelector } from "../redux/hooks"
import { addNeuron } from "../redux/store"
import Neuron from "./Neuron"

const Neurons = () => {
  const neurons = useAppSelector(state => state.neurons)
  const globalParameters = useAppSelector(state => state.globalParameters)

  return (
    <div className="w-lg">
      {neurons.map(neuron => (
        <Neuron key={neuron.id} neuron={neuron} globalParameters={globalParameters}></Neuron>
      ))}
      <div className="mx-5 max-w-lg shadow-lg"></div>
    </div>
  )
}

export default Neurons
