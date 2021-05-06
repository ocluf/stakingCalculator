import React from "react"
import logo from "../../static/logo.svg"
import shareIcon from "../../static/greyShareIcon.svg"
import twitterIcon from "../../static/twitterIcon.svg"
import telegramIcon from "../../static/telegramIcon.svg"
import settingsIcon from "../../static/greySettings.svg"
import questionMarkIcon from "../../static/greyFAQ.svg"
import plusSign from "../../static/bigAddButton.svg"
import { navigate } from "gatsby"
import { addNeuron, toggleAdvanced } from "../redux/store"
import { useDispatch } from "react-redux"
import { shareSite, shareTelegram, shareTwitter } from "../share"
import { useAppSelector } from "../redux/hooks"

const Banner = () => {
  const neurons = useAppSelector(state => state.neurons)
  const dispatch = useDispatch()

  const DesktopShare = () => {
    return (
      <>
        {/* <img
          src={telegramIcon}
          className="cursor-pointer"
          alt="telegram sharebutton"
          onClick={() => {
            shareTelegram([])
          }}
        /> */}
        <img
          src={twitterIcon}
          className="cursor-pointer"
          alt="twitter share button"
          onClick={() => {
            shareTwitter([])
          }}
        />
      </>
    )
  }

  return (
    <div className="bg-white p-4 flex flex-row justify-center lg:justify-start shadow-md">
      <img src={logo} className="max-w-logo max-h-logo" />
      <div className="ml-4 w-max">
        <h1 className="font-bold text-2xl top-0 "> ICP Neuron Calculator</h1>
        <h2 className="text-base bottom-0">Maximize your Vote, Maximize your ICP</h2>
      </div>
      <div className="hidden lg:flex lg:flex-row ml-auto space-x-4 ">
        {typeof window !== "undefined" && window.navigator.share !== undefined ? (
          <img src={shareIcon} onClick={() => shareSite(neurons)} className="ml-auto cursor-pointer" />
        ) : (
          <DesktopShare></DesktopShare>
        )}

        <img src={settingsIcon} className="cursor-pointer" onClick={() => dispatch(toggleAdvanced())} />
        <img
          src={questionMarkIcon}
          className="cursor-pointer"
          onClick={() => {
            navigate("/FAQ")
          }}
        />
        <img src={plusSign} className="cursor-pointer" onClick={() => dispatch(addNeuron())} />
      </div>
    </div>
  )
}

export default Banner
