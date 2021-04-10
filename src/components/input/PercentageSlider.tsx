import React, { useState } from "react"
import Slider from "@material-ui/core/Slider"
import { makeStyles, styled, withStyles } from "@material-ui/core"

const PercentageSlider = (props: {
  percentage: number
  title: string
  setPerc: Function
  postfix?: string
  valueToDisplay?: string
  defaultValue: number
  max: number
  min: number
  step: number
}) => {
  const [value, setValue] = useState(props.percentage)

  return (
    <div>
      <div>
        <div className="flex">
          <span className="flex-1">{props.title}</span>
          <span className="flex">{value + props.postfix}</span>
        </div>
      </div>
      <Slider
        id="percentageSlider"
        defaultValue={props.defaultValue}
        min={props.min}
        max={props.max}
        step={props.step}
        value={value}
        color="primary"
        onChangeCommitted={(e, value) => props.setPerc(value)}
        onChange={(e, value) => setValue(value)}
        aria-labelledby="percentage slider"
      />
    </div>
  )
}

export default PercentageSlider
