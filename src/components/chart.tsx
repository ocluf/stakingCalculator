import React from "react"
import { ResponsiveLine } from "@nivo/line"
import { useAppSelector } from "../redux/hooks"
import { allNeuronsValid, calculateCombinedDatapoints } from "../calcdatapoints"

const tooltip = input => {
  return <div className="bg-white border-black border-2 p-1 rounded-xl">{input.point.data.yFormatted} ICP</div>
}

const Chart = () => {
  const neurons = useAppSelector(state => state.neurons)

  const finalData = allNeuronsValid(neurons) ? calculateCombinedDatapoints(neurons) : null
  const numberLength =
    finalData && finalData.length > 0 ? Math.ceil(finalData[finalData.length - 1].y).toString().length : 0

  const chartData = [
    {
      id: "return",
      color: "hsl(56, 70%, 50%)",
      data: finalData,
    },
  ]

  return (
    <>
      <div className="hidden lg:flex lg:flex-col lg:justify-center lg:fle w-auto h-chart max-w-chart max-h-chart mx-auto">
        {allNeuronsValid(neurons) ? (
          <ResponsiveLine
            data={chartData}
            colors="#29ABE2"
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
              legend: "Year",
              legendOffset: 40,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: numberLength > 4 ? "" : "Stake (ICP)",
              legendOffset: -35 + -numberLength * 2,
              legendPosition: "middle",
            }}
            pointSize={10}
            pointColor="#FCB13B"
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            lineWidth={4}
            useMesh={true}
          />
        ) : (
          <div className="text-delete text-2xl mx-auto">Invalid Neuron Configuration</div>
        )}
      </div>
      {allNeuronsValid(neurons) ? null : (
        <div className="text-delete text-xl my-2 lg:hidden">Invalid Neuron Configuration</div>
      )}
    </>
  )
}

export default Chart
