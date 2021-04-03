import React, { useState, useEffect } from "react"
import { TextField, Slider, Collapse, Button } from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import NumberFormat from "react-number-format"
import InputAdornment from "@material-ui/core/InputAdornment"
import PercentageSlider from "../../components/input/PercentageSlider"
import AdvancedSettings from "../../components/input/AdvancedSettings"
import { CalculatorParameters, GlobalParameters, NumberFormatCustomProps } from "../../types"
import FormattedTextInput from "../../components/input/FormattedTextInput"

const InputFields = (props: {
  calcParams: CalculatorParameters
  globalParameters: GlobalParameters
  calculate: (x: CalculatorParameters) => void
}) => {
  const [calcParams, setCalcParams]: [CalculatorParameters, Function] = useState(props.calcParams)

  const setStakeSize = (value: string) => {
    const newStakeSize = parseInt(value.replace(/,/g, ""))
    setCalcParams({ ...calcParams, stakeSize: newStakeSize })
  }

  const setLockupPeriod = (value: number) => {
    setCalcParams({ ...calcParams, lockupPeriod: value })
  }

  useEffect(() => {
    handleCalculate()
  }, [calcParams.startDate, calcParams.lockupPeriod, props.globalParameters])

  useEffect(() => {
    const timeOutId = setTimeout(() => handleCalculate(), 500)
    return () => clearTimeout(timeOutId)
  }, [calcParams.stakeSize])

  const handleCalculate = () => {
    props.calculate(calcParams)
  }

  return (
    <form className="flex flex-shrink-0 flex-col space-y-4">
      <FormattedTextInput
        id="ICP_Amount"
        label="stake size"
        variant="outlined"
        value={calcParams.stakeSize.toString()}
        type="number"
        placeholder="The number of ICP in the neuron"
        onChange={e => setStakeSize(e.target.value)}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Starting date"
          value={calcParams.startDate}
          onChange={date => setCalcParams({ ...calcParams, startDate: date })}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <PercentageSlider
        title={"Staking period:"}
        percentage={calcParams.lockupPeriod}
        setPerc={setLockupPeriod}
        postfix={calcParams.lockupPeriod > 1 ? " years" : " year"}
        min={1}
        max={10}
        step={1}
        defaultValue={5}
      />
    </form>
  )
}

export default InputFields
