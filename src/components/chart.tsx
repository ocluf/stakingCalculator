import React from "react"
import { ResponsiveLine } from "@nivo/line"

const tooltip = input => {
  return <div className="bg-white border-black border-2 p-1 rounded-xl">{input.point.data.yFormatted} ICP</div>
}

const Chart = (props: { data }) => {
  const chartData = [
    {
      id: "return",
      color: "hsl(56, 70%, 50%)",
      data: props.data,
    },
  ]

  return (
    <div className="w-full h-full">
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
