import React from "react"
import Slider from "@material-ui/core/Slider"

const PercentageSlider = (props: {
  percentage: number
  title: string
  setPerc: Function
  postfix?: string
  defaulValue: number
  max: number
  step: number
}) => {
  return (
    <div>
      <div>
        <div className="flex">
          <span className="flex-1">{props.title}</span>
          <span className="flex">
            {props.percentage} {props.postfix}
          </span>
        </div>
      </div>
      <Slider
        id="percentageSlider"
        defaultValue={props.defaulValue}
        min={0}
        max={props.max}
        step={props.step}
        value={props.percentage}
        onChange={(e, value) => props.setPerc(value)}
        aria-labelledby="percentage slider"
      />
    </div>
  )
}

export default PercentageSlider
