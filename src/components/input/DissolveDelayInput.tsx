import React from "react"
import { useDispatch } from "react-redux"
import PercentageSlider from "./PercentageSlider"
import { changeDissolveDelay } from "../../redux/store"

const DissolveDelayInput = (props: { neuronId: string; dissolveDelay: number; lockupPeriod: number }) => {
  const dispatch = useDispatch()

  const setDissolveDelay = (x: number) => {
    dispatch(changeDissolveDelay({ id: props.neuronId, number: x }))
  }

  const postFix = (nrOfMonths: number): string => {
    const years: number = Math.floor(nrOfMonths / 12)
    const months = nrOfMonths % 12
    let postFix = ""
    if (years > 0) {
      postFix += years + " year"
      if (years > 1) {
        postFix += "s"
      }
    }
    if (months > 0) {
      if (years > 0) {
        postFix += " and "
      }
      postFix += months + " month"
      if (months > 1) {
        postFix += "s"
      }
    }
    return postFix
  }

  return (
    <PercentageSlider
      title={"Dissolve delay:"}
      percentage={props.dissolveDelay}
      setPerc={setDissolveDelay}
      valueDisplayTransformer={postFix}
      postfix={postFix(props.dissolveDelay)}
      optionalMax={props.lockupPeriod}
      min={6}
      max={96}
      step={1}
      defaultValue={24}
    />
  )
}

export default DissolveDelayInput
