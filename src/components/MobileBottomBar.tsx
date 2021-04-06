import React from "react"
import shareIcon from "../../static/shareIcon.svg"
import settingsIcon from "../../static/settings.svg"
import questionMarkIcon from "../../static/questionMark.svg"
import addButton from "../../static/addButton.png"
import { useDispatch } from "react-redux"
import { addNeuron, toggleAdvanced } from "../redux/store"
import { navigate } from "gatsby"

const MobileBottomBar = () => {
  const dispatch = useDispatch()
  return (
    <>
      <div className="bg-blue fixed bottom-0 flex flex-row space-x-4 h-bottombar w-full ">
        <img src={shareIcon} className="pl-2" />
        <img src={settingsIcon} onClick={() => dispatch(toggleAdvanced())} />
        <img
          src={questionMarkIcon}
          onClick={() => {
            navigate("/FAQ")
          }}
        />
      </div>
      <img src={addButton} onClick={() => dispatch(addNeuron())} className="fixed bottom-4 right-4" />
    </>
  )
}

export default MobileBottomBar
