import "../css/index.css"
import React, { useState } from "react"
import Banner from "../components/Banner"
import InputFields from "../components/inputFields/InputFields"
import Chart from "../components/Chart"
import CalculationOutcome from "../components/CalculationOutcome"
import Neurons from "../components/Neurons"

export default function Home() {
  return (
    <div className="flex flex-col p-3 space-y-4 max-w-lg mx-auto">
      <Banner />
      <Neurons />
    </div>
  )
}
