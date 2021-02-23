import React from "react"
import Banner from "../components/Banner"
import InputFields from "../components/InputFields"
import "../css/bundle.css"

export default function Home() {
  return (
    <div className="font-sans w-full">
      <Banner />
      <div className="flex m-5">
        <InputFields />

        {/* temp graph element */}
        <div className="flex-1 w-1/3 border border-gray-300 bg-gray-100 mx-8">
          Rewards graph  __/
        </div>

      </div>
    </div>
  )
}
