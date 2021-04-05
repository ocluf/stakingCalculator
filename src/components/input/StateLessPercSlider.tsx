import React, { useState } from "react"
import Slider from "@material-ui/core/Slider"

const StateLessPercentageSlider = (props: {
  value: number
  title: string
  onChange: Function
  postfix?: string
  valueToDisplay?: string
  defaultValue: number
  max: number
  min: number
  step: number
}) => {
  return (
    <div>
      <div>
        <div className="flex">
          <span className="flex-1">{props.title}</span>
          <span className="flex">{props.value + props.postfix}</span>
        </div>
      </div>
      <Slider
        id="percentageSlider"
        defaultValue={props.defaultValue}
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e, value) => props.onChange(value)} //TODO handle type error
        aria-labelledby="percentage slider"
      />
    </div>
  )
}

export default StateLessPercentageSlider
