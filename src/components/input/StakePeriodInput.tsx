import React from "react"
import { useDispatch } from "react-redux"
import PercentageSlider from "./PercentageSlider"
import { changeLockupPeriod } from "../../redux/store"

const stakePeriodInput = (props: { neuronId: string; lockupPeriod: number }) => {
  const dispatch = useDispatch()

  const setLockupPeriod = (x: number) => {
    dispatch(changeLockupPeriod({ id: props.neuronId, number: x }))
  }

  return (
    <PercentageSlider
      title={"Staking period:"}
      percentage={props.lockupPeriod}
      setPerc={setLockupPeriod}
      postfix={props.lockupPeriod > 1 ? " years" : " year"}
      min={1}
      max={20}
      step={1}
      defaultValue={5}
    />
  )
}

export default stakePeriodInput
