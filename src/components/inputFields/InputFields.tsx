import React, { useState, useEffect } from "react"
import { TextField, Slider, Collapse, Button } from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import ExpandMore from "@material-ui/icons/ExpandMore"
import ExpandLess from "@material-ui/icons/ExpandLess"
import InputAdornment from "@material-ui/core/InputAdornment"
import PercentageSlider from "./PercentageSlider"

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

  // toggle description visibility
  const [showDescriptions, setShowDescriptions] = useState(true)
  const handleDescriptionToggle = () => {
    setShowDescriptions(!showDescriptions)
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
  }

  const votingPercMarks = [
    { value: 25,  label: '25%' },
    { value: 50,  label: '50%' },
    { value: 75,  label: '75%' },
    { value: 100, label: '100%'}
  ]

  return (
    <form className="flex flex-shrink-0 flex-col space-y-5 w-96 m-5">

      {/* Simple options */}

      {/* stake size */}
      {/*if*/ showDescriptions &&
        <div className="">The graph shows the potential returns you could expect if you deposit this many ICP tokens in your neuron:</div>
      }
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

      {/* starting date */}
      <div>
        {/*if*/ showDescriptions && 
          <div className="">On this date:</div>
        }
        <div className="flex flex-shrink-0 flex-col">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="starting date"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>

      {/* dissolve period */}
      <div className="flex">
        {/*if*/ showDescriptions ? 
          <span className="flex-1">With a dissolve period of:</span>
        /*else*/: 
          <span className="flex-1">Dissolve period:</span> 
        }
        <span className="flex">{lockupPeriod} year{lockupPeriod!=1?"s":""}</span>
      </div>
      <div>
        <Slider 
          id="lockup_period"
          defaultValue={5}
          min={0}
          max={8}
          step={0.1}
          value={lockupPeriod}
          onChange={ (e, value) => setPeriod(value)} 
          aria-labelledby="lockup-period"
        />
      </div>

      {/*if*/ showDescriptions && 
        <div className="">
          Neurons on the Internet Computer are active participants in the network's governance system, 
          with votes placed on proposals or delegated to others. The more you participate, the higher your rewards.
        </div>
      }
      <div>
        Vote participation:
      </div>
      <div>
        {/* <PercentageSlider
          title="Vote participation:"
          percentage={votingPerc}
          setPerc={setVotingPerc}
          postfix="%"
          max={100}
          step={1}
          marks={votingPercMarks}
          defaulValue={100}
        /> */}
        <Slider 
          id="voting percentage"
          defaultValue={75}
          min={0}
          max={100}
          step={1}
          value={votingPerc}
          marks={votingPercMarks}
          onChange={ (e, value) => setVotingPerc(value)} 
          aria-labelledby="voting-percentage"
        />
      </div>

      {/* Advanced options */}

      <div className="flex justify-end w-full mb-4 text-blue-500 cursor-pointer" onClick={() => handleExpand()}>
        Advanced settings
        <div className="">{open ? <ExpandLess /> : <ExpandMore />}</div>
      </div>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className="flex flex-col w-full space-y-4">
          {/*if*/ showDescriptions && 
            <div className="text-sm mb-2">
              These settings are for advanced users interested in exploring the effect of global network parameters. 
              They are not part of your neuron's settings.
            </div> 
          }

          {/* total ICP supply */}
          <div>
            <div>Total token supply:</div>
            {/*if*/ showDescriptions && 
              <div className="text-sm">
                The global token supply is determined by the network as a whole, but you can explore the effect of changing 
                the total supply by adjusting this parameter. 
              </div> 
            }
          </div>
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
          <sup className="text-gray-400">* assumed constant total supply over time, for now</sup>

          {/* % of total supply staked in neurons */}
          {/*if*/ showDescriptions && 
            <div className="flex flex-col">
              <div>Percentage of total supply staked in neurons:</div>
              <div className="text-sm">
                Fewer participants mean higher rewards.            
              </div>
            </div>
          }
          <PercentageSlider
            title="% of network tokens staked in neurons:"
            percentage={stakePerc}
            setPerc={setStakePerc}
            postfix="%"
            defaulValue={90}
            max={100}
            step={1}
          />

        </div>
      </Collapse>

      <Button variant="contained" color="primary" onClick={handleCalculate}>
        Calculate
      </Button>

      <div className="flex justify-end w-full mb-4 pr-2 text-gray-400 cursor-pointer" 
           onClick={() => handleDescriptionToggle()}>
          {showDescriptions ? <span>hide help (compact mode)</span> : <span>show help</span>}
      </div>

    </form>
  )
}

export default InputFields
