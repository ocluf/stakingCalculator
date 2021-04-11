import Checkbox from "@material-ui/core/Checkbox"
import Alert from "@material-ui/lab/Alert/Alert"

import React from "react"
import { useDispatch } from "react-redux"
import { getNrYearsFromNeurons, getTotalCheckedReturn, getTotalCheckedStake } from "../calcdatapoints"
import { useAppSelector } from "../redux/hooks"
import { toggleChecked, toggleGlobalChecked } from "../redux/store"
import Chart from "./Chart"

const GlobalCheckBox = (props: { allChecked: boolean; allUnchecked: boolean }) => {
  const dispatch = useDispatch()
  return (
    <div className="flex flex-row items-center space-x-2">
      <Checkbox
        checked={props.allChecked}
        indeterminate={!props.allChecked && !props.allUnchecked}
        onClick={() => dispatch(toggleGlobalChecked(!props.allChecked))}
        color="primary"
      />
      <div className="w-twopx h-full bg-checkboxGrey"></div>
    </div>
  )
}

const NeuronCheckbox = (props: { checked: boolean; index: number; neuronId: string }) => {
  const dispatch = useDispatch()
  return (
    <div className="flex flex-row items-center w-32 mx-2">
      <Checkbox checked={props.checked} color="primary" onChange={() => dispatch(toggleChecked(props.neuronId))} />
      <div>Neuron {props.index}</div>
    </div>
  )
}

const NeuronSelector = () => {
  const neurons = useAppSelector(state => state.neurons)
  const allChecked = neurons.filter(neuron => !neuron.checked).length === 0
  const allUnchecked = neurons.filter(neuron => neuron.checked).length === 0
  return (
    <div className="flex flex-row">
      <GlobalCheckBox allChecked={allChecked} allUnchecked={allUnchecked}></GlobalCheckBox>
      <div className="flex flex-row flex-wrap">
        {neurons.map((neuron, index) => (
          <NeuronCheckbox key={neuron.id} checked={neuron.checked} index={index + 1} neuronId={neuron.id} />
        ))}
      </div>
    </div>
  )
}

const ReturnStatistic = (props: { title: string; main: string; bottom: string }) => {
  return (
    <div>
      <div className="text-sm">{props.title}</div>
      <div className="text-2xl font-bold">{props.main}</div>
      <div className="text-lightGrey text-xs opacity-40">{props.bottom}</div>
    </div>
  )
}

const ReturnStatistics = () => {
  const neurons = useAppSelector(state => state.neurons)
  const exchangeRate = useAppSelector(state => state.exchangeRate)
  const totalStake = getTotalCheckedStake(neurons)
  const totalReturn = getTotalCheckedReturn(neurons)
  const roi = (totalReturn / totalStake) * 100
  const roiString: string = isNaN(roi) ? "0%" : roi.toFixed(2) + "%"
  const roiBottomString: string = isNaN(roi)
    ? "or 0% annualized"
    : `or ${(roi / getNrYearsFromNeurons(neurons)).toFixed(2)}% annualized`
  return (
    <div className="flex flex-row space-x-14 w-max my-4 mx-auto">
      <ReturnStatistic
        title="Assets locked"
        main={totalStake + " ICP"}
        bottom={"$" + (totalStake * exchangeRate).toFixed(2)}
      />
      <ReturnStatistic
        title="Total Return"
        main={totalReturn.toFixed(2) + " ICP"}
        bottom={"$" + (totalReturn * exchangeRate).toFixed(2)}
      />
      <ReturnStatistic title="ROI" main={roiString} bottom={roiBottomString} />
    </div>
  )
}

const DashBoard = () => {
  return (
    <div className="hidden bg-white mt-5 p-5 w-dashboard min-h-dashboard shadow-lg rounded-lg lg:block">
      <NeuronSelector></NeuronSelector>
      <Chart />
      <ReturnStatistics />
      <Alert variant="outlined" severity="error">
        Actual returns may differ from these projections based on several unknown parameters, to learn more check out
        the FAQ.
      </Alert>
    </div>
  )
}

export default DashBoard
