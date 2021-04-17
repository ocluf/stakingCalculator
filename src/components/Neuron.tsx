import { Collapse } from "@material-ui/core"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import React from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../redux/hooks"
import { changeExpanded, deleteNeuron } from "../redux/store"
import { GlobalParameters, NeuronType } from "../types"
import StakePeriodInput from "./input/StakePeriodInput"
import StakeSizeInput from "./input/StakeSizeInput"
import StartDateInput from "./input/StartDateInput"
import longArrow from "../../static/longArrow.svg"
import { Divider } from "material-ui"

const Neuron = (props: { neuron: NeuronType; globalParameters: GlobalParameters; index: number }) => {
  const currentNeuronId: string = useAppSelector(state => state.currenNeuronId)
  const exchangeRate: number = useAppSelector(state => state.exchangeRate)
  const dispatch = useDispatch()
  const dataLength: number = props.neuron.data.length
  const finalReward: number =
    dataLength > 0
      ? props.neuron.data.reduce((acc, dataPoint) => {
          return acc + dataPoint.y
        }, 0)
      : 0
  const finalRewardString: string = finalReward.toFixed(2)

  const ResultCard = (props: {
    initialStake: number
    finalReward: number
    exchangeRate: number
    stakePeriod: number
  }) => {
    const finalICP = props.initialStake + props.finalReward

    return (
      <div className="bg-ligthGrey p-4">
        <div className="flex flex-row mb-5">
          <div className="mr-5">
            <div className="font-bold text-xl">{props.initialStake.toFixed(2)}</div>
            <div className="text-darkGrey font-light italic">
              ${(props.initialStake * props.exchangeRate).toFixed(2)}
            </div>
          </div>
          <img src={longArrow} className="w-16 mx-auto -mt-5" />
          <div className="ml-5">
            <div className="font-bold text-xl text-blue">{finalICP.toFixed(2)}</div>
            <div className="text-darkGrey font-light italic text-right">
              ${(finalICP * props.exchangeRate).toFixed(2)}
            </div>
          </div>
        </div>
        <div className="text-darkGrey">
          Given the ICP price of ${props.exchangeRate.toFixed(2)} USD, the value of your original stake would be worth $
          {(finalICP * props.exchangeRate).toFixed(2)} after {props.stakePeriod} years.
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white w-neuron m-5 bottom-0 rounded-lg shadow-lg">
      <div
        className="flex flex-row items-baseline p-4 cursor-pointer"
        onClick={() => dispatch(changeExpanded({ id: props.neuron.id }))}
      >
        <div className="font-medium text-lg ">Neuron {props.index + 1}</div>
        <div className="flex-1 text-left ml-5 text-mediumGrey">
          {props.neuron.stakeSize + " ICP / " + props.neuron.lockupPeriod + " yr."}
        </div>
        <div>{props.neuron.id === currentNeuronId ? <ExpandLess /> : <ExpandMore />}</div>
      </div>
      <Collapse in={props.neuron.id === currentNeuronId} unmountOnExit timeout="auto">
        <div className="w-auto h-auto m-2 p-4 flex flex-col space-y-5 max-w-lg">
          <StakeSizeInput neuronId={props.neuron.id} stakeSize={props.neuron.stakeSize}></StakeSizeInput>
          <StartDateInput neuronId={props.neuron.id} startDate={props.neuron.startDate}></StartDateInput>
          <StakePeriodInput neuronId={props.neuron.id} lockupPeriod={props.neuron.lockupPeriod}></StakePeriodInput>
          <ResultCard
            initialStake={props.neuron.stakeSize}
            finalReward={finalReward}
            exchangeRate={exchangeRate}
            stakePeriod={props.neuron.lockupPeriod}
          ></ResultCard>
          <div
            className="font-medium text-delete ml-auto pt-2 cursor-pointer"
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
