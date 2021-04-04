import { Collapse } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import React from "react"
import { useDispatch } from "react-redux"
import Chart from "./chart"
import { useAppSelector } from "../redux/hooks"
import { changeExpanded, deleteNeuron } from "../redux/store"
import { GlobalParameters, NeuronType } from "../types"
import StakePeriodInput from "./input/StakePeriodInput"
import StakeSizeInput from "./input/StakeSizeInput"
import StartDateInput from "./input/StartDateInput"

const Neuron = (props: { neuron: NeuronType; globalParameters: GlobalParameters }) => {
  //const largeScreen: boolean = useAppSelector(state => state.largeScreen)
  const currentNeuronId: string = useAppSelector(state => state.currenNeuronId)
  const dispatch = useDispatch()
  const dataLength: number = props.neuron.data.length
  const finalReward: string = dataLength > 0 ? props.neuron.data[dataLength - 1].y.toFixed(2) : "0"

  return (
    <div className="bg-white max-w-lg m-5 rounded-lg shadow-lg">
      <div
        className="flex flex-row p-4 cursor-pointer"
        onClick={() => dispatch(changeExpanded({ id: props.neuron.id }))}
      >
        <div className="font-bold text-primary">Neuron</div>
        <div className="flex-1 text-right text-gray-500">{"~" + finalReward + " ICP"}</div>
        {props.neuron.id === currentNeuronId ? <ExpandLess /> : <ExpandMore />}
      </div>
      <Collapse in={props.neuron.id === currentNeuronId} unmountOnExit timeout="auto">
        <div className="w-auto h-auto m-2 p-4 flex flex-shrink-0 flex-col max-w-lg">
          <StakeSizeInput neuronId={props.neuron.id} stakeSize={props.neuron.stakeSize}></StakeSizeInput>
          <StartDateInput neuronId={props.neuron.id} startDate={props.neuron.startDate}></StartDateInput>
          <StakePeriodInput neuronId={props.neuron.id} lockupPeriod={props.neuron.lockupPeriod}></StakePeriodInput>
          <div className="w-auto h-96 sm:invisible sm:h-0">
            <Chart data={props.neuron.data}></Chart>
          </div>
          <div
            className="font-semibold text-delete ml-auto pt-2 cursor-pointer"
            onClick={() => dispatch(deleteNeuron({ id: props.neuron.id }))}
          >
            DELETE NEURON
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default Neuron
