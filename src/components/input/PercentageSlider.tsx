import React, { useState } from "react"
import Slider from "@material-ui/core/Slider"

const PercentageSlider = (props: {
  percentage: number
  title: string
  setPerc: Function
  postfix?: string
  valueDisplayTransformer?: Function
  defaultValue: number
  max: number
  optionalMax?: number
  min: number
  step: number
}) => {
  const [value, setValue] = useState(props.percentage)

  const displayValue: string = props.valueDisplayTransformer
    ? props.valueDisplayTransformer(value)
    : value + props.postfix
  return (
    <div>
      <div>
        <div className="flex">
          <span className="flex-1">{props.title}</span>
          <span className="flex"> {displayValue}</span>
        </div>
      </div>
      <Slider
        id="percentageSlider"
        defaultValue={props.defaultValue}
        min={props.min}
        max={props.max}
        step={props.step}
        value={value}
        color={value > props.optionalMax ? "secondary" : "primary"}
        onChangeCommitted={(e, value) => props.setPerc(value)}
        onChange={(e, value) => setValue(value)}
        aria-labelledby="percentage slider"
      />
      {value > props.optionalMax ? (
        <div className="text-delete text-xs"> Dissolve delay can't be higher than staking period</div>
      ) : null}
    </div>
  )
}

export default PercentageSlider
