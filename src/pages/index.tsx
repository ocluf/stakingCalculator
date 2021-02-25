import "../css/index.css"
import React, { useState } from "react"
import Banner from "../components/Banner"
import InputFields from "../components/inputFields/InputFields"
import Chart from "../components/Chart"
import createDataPoints from "../components/calcdatapoints"

export default function Home() {
  const [chartData, setChartData] = useState([])

  const setCalcParams = (calcParams: CalculatorParameters) => {
    const data = createDataPoints(calcParams)
    setChartData(data)
  }

  return (
    <div className="font-sans w-full">
      <Banner />
      <div className="flex flex-wrap m-5 justify-center">
        <InputFields calculate={setCalcParams} />

        <div className="flex-1 min-w-1 w-11/12 h-96	 border border-gray-300 mx-8 max-w-screen-sm m-5">
          <Chart data={chartData} />
        </div>
      </div>
    </div>
  )
}
