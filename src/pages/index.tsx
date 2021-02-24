import React from "react"
import Banner from "../components/Banner"
import InputFields from "../components/InputFields"
import "../css/index.css"

export default function Home() {
  return (
    <div className="font-sans">
      <Banner />
      <InputFields />
    </div>
  )
}
