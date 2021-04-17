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

const MobileBottomBar = () => {
  const dispatch = useDispatch()
  const neurons = useAppSelector(state => state.neurons)
  const checkedNeuronSize = neurons.reduce((acc, neuron) => {
    return neuron.checked ? acc + 1 : acc
  }, 0)
  const shareData = {
    title: "Neuron Calculator",
    text: `My neuron${checkedNeuronSize > 1 ? "s" : ""} will earn me ${getTotalCheckedReturn(neurons).toFixed(
      2
    )}, how much will yours earn you?`,
    url: "https://angry-davinci-aaea5b.netlify.app/",
  }

  const shareCalculator = () => {
    if (typeof window !== "undefined" && checkedNeuronSize > 0) {
      window.navigator.share(shareData)
    }
  }

  return (
    <div className="lg:hidden">
      <div className="bg-blue fixed bottom-0 flex flex-row space-x-4 h-bottombar w-full ">
        <img src={shareIcon} onClick={() => shareCalculator()} className="pl-2" />
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
