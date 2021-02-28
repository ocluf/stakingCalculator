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

const InputFields = (props: { calculate: (x: CalculatorParameters) => void }) => {
  // standard fields
  const [stakeSize, setStake]: [string, Function] = useState("100")
  const [selectedDate, setSelectedDate]: [Date, Function] = useState(new Date("2021-03-31"))
  const [lockupPeriod, setPeriod]: [number, Function] = useState(5.0)
  const [votingPerc, setVotingPerc]: [number, Function] = useState(100)
  const [stakePerc, setStakePerc]: [number, Function] = useState(90)
  const [totalSupply, setTotalSupply]: [string, Function] = useState("476,190,476")

  // advanced settings collapse
  const [open, setOpen] = useState(false)
  const handleExpand = () => {
    setOpen(!open)
  }

  const handleDateChange = date => {
    setSelectedDate(date)
  }

  useEffect(() => {
    handleCalculate()
  }, [])

  const handleCalculate = () => {
    props.calculate({
      stakeSize: parseInt(stakeSize.replace(",", "")),
      startDate: selectedDate,
      lockupPeriod: lockupPeriod,
      stakedPerc: stakePerc / 100,
      votingPerc: votingPerc / 100,
      totalSupply: parseInt(totalSupply),
    })
  }

  return (
    <form className="flex flex-shrink-0 flex-col space-y-4">
      <FormattedTextInput
        id="ICP_Amount"
        label="stake size"
        variant="outlined"
        value={stakeSize}
        type="number"
        placeholder="The number of ICP in the neuron"
        onChange={e => setStake(e.target.value)}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Starting date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <PercentageSlider
        title={"With a dissolve period of:"}
        percentage={lockupPeriod}
        setPerc={setPeriod}
        postfix={lockupPeriod > 1 ? " years" : " year"}
        min={0.3}
        max={8}
        step={0.1}
        defaulValue={5}
      />
      <AdvancedSettings open={open} handleExpand={handleExpand}>
        <PercentageSlider
          title="percentage of votes participated in:"
          percentage={votingPerc}
          setPerc={setVotingPerc}
          postfix="%"
          max={100}
          min={0}
          step={1}
          defaulValue={100}
        />
        <PercentageSlider
          title="percentage locked inside voting neurons:"
          percentage={stakePerc}
          setPerc={setStakePerc}
          postfix="%"
          defaulValue={90}
          min={1}
          max={100}
          step={1}
        />
        <div>for now assumed constant total supply:</div>
        <FormattedTextInput
          required={true}
          id="total supplyasd"
          label="total supply"
          value={totalSupply}
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
