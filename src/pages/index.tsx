import "../css/index.css"
import React, { useState } from "react"
import Banner from "../components/Banner"
import InputFields from "../components/inputFields/InputFields"
import Chart from "../components/Chart"
import createDataPoints from "../components/calcdatapoints"
import CalculationOutcome from "../components/CalculationOutcome"

export default function Home() {
  const [chartData, setChartData] = useState([{ y: 1 }])
  const [calcParameters, setCalcParameters]: [CalculatorParameters | null, Function] = useState(null)

  const setCalcParams = (calcParams: CalculatorParameters) => {
    const data = createDataPoints(calcParams)
    setChartData(data)
    setCalcParameters(calcParams)
  }

  return (
    <div className="flex flex-col p-3 space-y-4 max-w-lg mx-auto">
      <Banner />
      <InputFields calculate={setCalcParams} />

      <div className="border border-gray-300 w-full h-96">
        <Chart data={chartData} />
      </div>
      <CalculationOutcome calcParams={calcParameters} reward={chartData.slice(-1)[0].y.toFixed(2)} />
    </div>
  )
}
