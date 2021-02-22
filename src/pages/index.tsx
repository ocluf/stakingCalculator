import React from "react"
import Banner from "../components/Banner"
import Logo from "../components/logo"
import Calculator from "../components/oldCalcExperiment/calculator"
import Chart from "../components/oldCalcExperiment/chart"

export default function Home() {
  return (
    <div className="font-sans">
      <Banner></Banner>
      <Calculator></Calculator>
    </div>
  )
}
