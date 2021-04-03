import React from "react"
import { useAppSelector } from "../redux/hooks"

const TotalResult = () => {
  const neurons = useAppSelector(state => state.neurons)
  const totalReward: number = neurons.reduce((acc, neuron) => {
    if (neuron.data.length > 0) {
      return acc + neuron.data[neuron.data.length - 1].y
    } else {
      return acc
    }
  }, 0)
  const highestEndDate: number = neurons.reduce((acc, neuron) => {
    return Math.max(acc, neuron.startDate + neuron.lockupPeriod * (1000 * 60 * 60 * 24 * 365))
  }, 0)
  const lowestStartDate: number = neurons.reduce((acc, neuron) => {
    return Math.min(acc, neuron.startDate)
  }, Infinity)
  const totalPeriod: number = Math.round((highestEndDate - lowestStartDate) / (1000 * 60 * 60 * 24 * 365))

  const Bold = (props: { x: string }) => <span className="font-semibold">{props.x}</span>

  return (
    <div className="w-auto bg-white p-5 m-5 rounded-lg shadow-lg">
      Starting at <Bold x={new Date(lowestStartDate).toDateString()} /> After <Bold x={totalPeriod + " years"} /> your
      combined neuron return would be <Bold x={totalReward.toFixed(2)} />
    </div>
  )
}

export default TotalResult
