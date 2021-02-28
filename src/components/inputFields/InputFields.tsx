import React, { useState, useEffect } from "react"
import { TextField, Slider, Collapse, Button } from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import ExpandMore from "@material-ui/icons/ExpandMore"
import ExpandLess from "@material-ui/icons/ExpandLess"
import InputAdornment from "@material-ui/core/InputAdornment"
import PercentageSlider from "./PercentageSlider"
import AdvancedSettings from "./AdvancedSettings"

const InputFields = (props: { calculate: (x: CalculatorParameters) => void }) => {
  // standard fields
  const [stakeSize, setStake]: [string, Function] = useState("100")
  const [selectedDate, setSelectedDate]: [Date, Function] = useState(new Date("2021-03-31"))
  const [lockupPeriod, setPeriod]: [number, Function] = useState(5.0)
  const [votingPerc, setVotingPerc]: [number, Function] = useState(100)
  const [stakePerc, setStakePerc]: [number, Function] = useState(90)
  const [totalSupply, setTotalSupply]: [string, Function] = useState("476190476")

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
      stakeSize: parseInt(stakeSize),
      startDate: selectedDate,
      lockupPeriod: lockupPeriod,
      stakedPerc: stakePerc / 100,
      votingPerc: votingPerc / 100,
      totalSupply: parseInt(totalSupply),
    })
    window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: "smooth" })
  }

  return (
    <form className="flex flex-shrink-0 flex-col space-y-4">
      <TextField
        required={true}
        id="ICP_Amount"
        label="stake size"
        value={stakeSize}
        variant="outlined"
        placeholder="99"
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">ICP</InputAdornment>,
        }}
        onChange={e => setStake(e.target.value)}
        aria-labelledby="stake-size"
      ></TextField>
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
          title="percentage of total supply staked:"
          percentage={stakePerc}
          setPerc={setStakePerc}
          postfix="%"
          defaulValue={90}
          min={1}
          max={100}
          step={1}
        />
        <div>for now assumed constant total supply:</div>
        <TextField
          required={true}
          id="total supply"
          label="total supply"
          value={totalSupply}
          variant="outlined"
          placeholder="total number of tokens"
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">ICP</InputAdornment>,
          }}
          onChange={e => setTotalSupply(e.target.value)}
          aria-labelledby="stake-size"
        ></TextField>
      </AdvancedSettings>
      <Button variant="contained" color="primary" onClick={handleCalculate}>
        Calculate
      </Button>
    </form>
  )
}

export default InputFields
