import React from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../redux/hooks"
import { toggleChecked } from "../redux/store"

const NeuronCheckbox = (props: { checked: boolean; index: number; neuronId: string }) => {
  const dispatch = useDispatch()

  return (
    <div className="flex flex-row space-x-2">
      <input type="checkbox" onChange={() => dispatch(toggleChecked(props.neuronId))} />
      <div>Neuron {props.index}</div>
    </div>
  )
}

const NeuronSelector = () => {
  const neurons = useAppSelector(state => state.neurons)

  return (
    <div className="flex flex-row space-x-4">
      {neurons.map((neuron, index) => (
        <NeuronCheckbox key={neuron.id} checked={neuron.checked} index={index} neuronId={neuron.id} />
      ))}
    </div>
  )
}

const Chart = () => {
  return <div className="bg-blue w-chart h-chart"></div>
}

const DashBoard = () => {
  return (
    <div>
      <div className="bg-white mt-5 p-5 w-dashboard min-h-dashboard shadow-lg rounded-lg">
        <div>Your stake over time</div>
        <NeuronSelector></NeuronSelector>
        <Chart></Chart>
      </div>
    </div>
  )
}

export default DashBoard
