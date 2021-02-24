import "../css/index.css"
import React from "react"
import Banner from "../components/Banner"
import InputFields from "../components/InputFields"
import ResponsiveLine from "../components/Chart"

export default function Home() {
  return (
    <div className="font-sans w-full">
      <Banner />
      <div className="flex m-5">
        <InputFields />

        <div className="flex-1 w-1/3 border border-gray-300 bg-gray-100 mx-8">
          <ResponsiveLine />
        </div>
      </div>
    </div>
  )
}
