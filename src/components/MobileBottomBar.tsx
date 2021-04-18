import React from "react"
import shareIcon from "../../static/shareIcon.svg"
import settingsIcon from "../../static/settings.svg"
import questionMarkIcon from "../../static/questionMark.svg"
import addButton from "../../static/addButton.png"
import { useDispatch } from "react-redux"
import { addNeuron, toggleAdvanced } from "../redux/store"
import { useAppSelector } from "../redux/hooks"
import { navigate } from "gatsby"
import { getTotalCheckedReturn } from "../calcdatapoints"
import { NeuronType } from "../types"
import { shareSite } from "../share"

const MobileBottomBar = () => {
  const dispatch = useDispatch()
  const neurons = useAppSelector(state => state.neurons)

  return (
    <div className="lg:hidden">
      <div className="bg-blue fixed bottom-0 flex flex-row space-x-4 h-bottombar w-full ">
        <img src={shareIcon} onClick={() => shareSite(neurons)} className="pl-2" />
        <img src={settingsIcon} onClick={() => dispatch(toggleAdvanced())} />
        <img
          src={questionMarkIcon}
          onClick={() => {
            navigate("/FAQ")
          }}
        />
      </div>
      <img src={addButton} onClick={() => dispatch(addNeuron())} className="fixed bottom-4 right-4" />
    </div>
  )
}

export default MobileBottomBar
