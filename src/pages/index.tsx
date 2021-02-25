import "../css/index.css"
import React, { useState } from "react"
import Banner from "../components/Banner"
import InputFields from "../components/InputFields"
import Chart from "../components/Chart"
import createDataPoints from "../components/calcdatapoints"

export default function Home() {
  const [chartData, setChartData] = useState([])

  const setCalcParams = (calcParams: CalculatorParameters) => {
    const data = createDataPoints(calcParams)
    console.log("test")
    setChartData(data)
  }

  return (
    <div className="font-sans w-full">
      <Banner />
      <div className="flex m-5">
        <InputFields calculate={setCalcParams} />

        <div className="flex-1 w-1/3 border border-gray-300 bg-gray-100 mx-8">
          <Chart data={chartData} />
        </div>
      </div>
    </div>
  )
}
