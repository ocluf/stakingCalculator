import React from "react"
import { ResponsiveLine } from "@nivo/line"
import { useAppSelector } from "../redux/hooks"
import Neurons from "./Neurons"

const tooltip = input => {
  return <div className="bg-white border-black border-2 p-1 rounded-xl">{input.point.data.yFormatted} ICP</div>
}

const Chart = (props: { data }) => {
  const neurons = useAppSelector(state => state.neurons)

  const yearMs = 1000 * 60 * 60 * 24 * 365

  const lowestCheckedStartDate: number = neurons.reduce((acc, neuron) => {
    return neuron.checked ? Math.min(acc, neuron.startDate) : acc
  }, Infinity)

  const highestCheckedEndDate: number = neurons.reduce((acc, neuron) => {
    return neuron.checked ? Math.max(acc, neuron.startDate + neuron.lockupPeriod * yearMs) : acc
  }, 0)

  const nrOfYears: number = Math.ceil((highestCheckedEndDate - lowestCheckedStartDate) / yearMs)

  interface Bucket {
    year: number
    timestamp: number
    value: number
  }

  let yearlyBuckets: Array<Bucket> = []
  for (let i = 0; i < nrOfYears; i++) {
    yearlyBuckets.push({
      year: i,
      timestamp: lowestCheckedStartDate + i * yearMs,
      value: 0,
    })
  }

  const putInBucket = (timestamp: number, value: number) => {
    const bucketIndex = yearlyBuckets.findIndex(bucket => bucket.timestamp >= timestamp)
    if (bucketIndex === -1) {
      console.error("should find at least one bucket")
      return
    }
    const oldBucket = yearlyBuckets[bucketIndex]
    const newBucket = { ...oldBucket, value: oldBucket.value + value }
    yearlyBuckets[bucketIndex] = newBucket
  }

  neurons
    .filter(neuron => neuron.checked)
    .forEach(neuron => neuron.data.forEach(dataPoint => putInBucket(dataPoint.x, dataPoint.y)))

  const chartData = [
    {
      id: "return",
      color: "hsl(56, 70%, 50%)",
      data: props.data,
    },
  ]

  return (
    <div className="w-full h-full rounded-lg">
      <ResponsiveLine
        data={chartData}
        tooltip={tooltip}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 30,
          legend: "time",
          legendOffset: 40,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "total return",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={13}
        pointColor="inherit"
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        lineWidth={4}
        useMesh={true}
      />
    </div>
  )
}

export default Chart
