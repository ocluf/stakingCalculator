import React from "react"
import createDataPoints from "../components/calcdatapoints"
import { ResponsiveLine } from "@nivo/line"

const mockCalculatorParams: CalculatorParameters = {
  stakeSize: 100,
  stakedPerc: 0.9,
  startDate: new Date(2021, 3, 31),
  lockupPeriod: 6,
  votingPerc: 1,
}

const testdata = createDataPoints(mockCalculatorParams)
//let testdata2 = testdata.map(e => (e.x = e.x.toString()))
//testdata2 = testdata2.filter(e => typeof e.y === "number")
//console.log(testdata)

const data = [
  {
    id: "reward",
    color: "hsl(56, 70%, 50%)",
    data: testdata,
  },
]

const MyResponsiveLine = () => (
  <div className="w-auto h-96">
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
        tickRotation: 0,
        legend: "days staked",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "total reward",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  </div>
)

export default MyResponsiveLine
