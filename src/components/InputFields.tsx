import React, { useState } from "react"
import { TextField, Slider, Collapse, Button } from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import ExpandMore from "@material-ui/icons/ExpandMore"
import ExpandLess from "@material-ui/icons/ExpandLess"
import InputAdornment from "@material-ui/core/InputAdornment"

const InputFields = (props: { calculate: (x: CalculatorParameters) => void }) => {
  // standard fields
  const [stakeSize, setStake]: [string, Function] = useState("100")
  const [selectedDate, setSelectedDate]: [Date, Function] = useState(new Date("2021-03-31"))
  //const [startingPeriod, setStartingPeriod]: [number, Function] = useState(0)
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

  const handleCalculate = () => {
    props.calculate({
      stakeSize: parseInt(stakeSize),
      startDate: selectedDate,
      lockupPeriod: lockupPeriod,
      stakedPerc: stakePerc / 100,
      votingPerc: votingPerc / 100,
      totalSupply: parseInt(totalSupply),
    })
  }

  // add advanced setting folder with
  // expected total amount staked
  // total supply
  // expected average maturity

  return (
    <div className="">
      <form className="flex flex-col space-y-4 max-w-sm m-8 p-5">
        <div className="">If you deposit this many ICP tokens in your neuron:</div>
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
        <div>neuron start date (min = 31 march 2021)</div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        {/** 
          <div>
            <div className="flex">
              <span className="flex-1">This many days after genesis:</span>
              <span className="flex">{startingPeriod}</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 font-extralight">&lt;&lt;&lt;&lt; lower is better</div>
            <Slider
              id="start_date"
              defaultValue={0}
              min={0}
              max={500}
              value={startingPeriod}
              onChange={(e, value) => setStartingPeriod(value)}
              aria-labelledby="start-period"
            />
          </div>
          */}
        <div>
          <div className="flex">
            <span className="flex-1">With a dissolve period of:</span>
            <span className="flex">
              {lockupPeriod} year{lockupPeriod != 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div>
          <Slider
            id="lockup_period"
            defaultValue={5}
            min={0}
            max={8}
            step={0.1}
            value={lockupPeriod}
            onChange={(e, value) => setPeriod(value)}
            aria-labelledby="lockup-period"
          />
        </div>
        <div className="flex w-full" onClick={handleExpand}>
          Advanced settings
          <div className="ml-2">{open ? <ExpandLess /> : <ExpandMore />}</div>
        </div>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <div className="flex flex-col w-full space-y-4">
            <div>
              <div className="flex">
                <span className="flex-1">percentage of votes participated in:</span>
                <span>{votingPerc}%</span>
              </div>
              <div className="w-full">
                <Slider
                  id="voting percentage"
                  min={0}
                  max={100}
                  step={1}
                  value={votingPerc}
                  onChange={(e, value) => setVotingPerc(value)}
                  aria-labelledby="voting-percentage"
                />
              </div>
            </div>
            <div>
              <div className="flex">
                <span className="flex-1">percentage of total supply staked:</span>
                <span>{stakePerc}%</span>
              </div>
              <div className="w-full">
                <Slider
                  id="voting percentage"
                  min={0}
                  max={100}
                  step={1}
                  value={stakePerc}
                  onChange={(e, value) => setStakePerc(value)}
                  aria-labelledby="staking-percentage"
                />
              </div>
            </div>
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
          </div>
        </Collapse>
        {/** 
        <div className="flex flex-col space-y-3 pb-11">
          <div className="flex justify-center text-xl font-light">You can earn a daily return of up to</div>
          <div className="flex justify-center text-2xl">Some tokens</div>
        </div>

        <div className="">
          Neurons on the Internet Computer are active participants in the network's governance system, with votes placed
          on proposals or delegated to others. The more you participate, the higher your rewards.
        </div>
        */}
        <Button variant="contained" color="primary" onClick={handleCalculate}>
          Calculate
        </Button>
      </form>
    </div>
  )
}

export default InputFields
