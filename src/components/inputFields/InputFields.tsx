import React, { useState, useEffect } from "react"
import { TextField, Slider, Collapse, Button } from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import NumberFormat from "react-number-format"
import InputAdornment from "@material-ui/core/InputAdornment"
import PercentageSlider from "./PercentageSlider"
import AdvancedSettings from "./AdvancedSettings"
import { CalculatorParameters, NumberFormatCustomProps } from "../../types/types"
import FormattedTextInput from "./FormattedTextInput"

const InputFields = (props: { calcParams: CalculatorParameters; calculate: (x: CalculatorParameters) => void }) => {
  const [calcParams, setCalcParams]: [CalculatorParameters, Function] = useState(props.calcParams)

  const setStakeSize = (value: string) => {
    const newStakeSize = parseInt(value.replace(/,/g, ""))
    setCalcParams({ ...calcParams, stakeSize: newStakeSize })
  }

  const setLockupPeriod = (value: number) => {
    setCalcParams({ ...calcParams, lockupPeriod: value })
  }

  const setTotalSupply = (value: string) => {
    const newStakeSize = parseInt(value.replace(/,/g, ""))
    setCalcParams({ ...calcParams, totalSupply: newStakeSize })
  }

  const setVotingPerc = (value: number) => {
    setCalcParams({ ...calcParams, votingPerc: value })
  }

  const setStakedPerc = (value: number) => {
    setCalcParams({ ...calcParams, stakedPerc: value })
  }

  // advanced settings collapse
  const [open, setOpen] = useState(false)
  const handleExpand = () => {
    setOpen(!open)
  }

  useEffect(() => {
    handleCalculate()
  }, [])

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
        title={"With a dissolve period of:"}
        percentage={calcParams.lockupPeriod}
        setPerc={setLockupPeriod}
        postfix={calcParams.lockupPeriod > 1 ? " years" : " year"}
        min={0.3}
        max={8}
        step={0.1}
        defaulValue={5}
      />
      <AdvancedSettings open={open} handleExpand={handleExpand}>
        <PercentageSlider
          title="percentage of votes participated in:"
          percentage={calcParams.votingPerc}
          setPerc={setVotingPerc}
          postfix="%"
          max={100}
          min={0}
          step={1}
          defaulValue={100}
        />
        <PercentageSlider
          title="percentage locked inside voting neurons:"
          percentage={calcParams.stakedPerc}
          setPerc={setStakedPerc}
          postfix="%"
          defaulValue={90}
          min={1}
          max={100}
          step={1}
        />
        <div>for now assumed constant total supply:</div>
        <FormattedTextInput
          required={true}
          id="total supply"
          label="total supply"
          value={calcParams.totalSupply}
          placeholder="total number of tokens"
          type="number"
          onChange={e => setTotalSupply(e.target.value)}
          aria-labelledby="stake-size"
        ></FormattedTextInput>
      </AdvancedSettings>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleCalculate()
          window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: "smooth" })
        }}
      >
        Calculate
      </Button>
    </form>
  )
}

export default InputFields
