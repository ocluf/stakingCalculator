import React, { useState } from "react"
import {
  TextField,
  Slider,
} from "@material-ui/core"
import InputAdornment from "@material-ui/core/InputAdornment"

const InputFields = () => {
  // standard fields
  const [stakeSize, setStake]: [string, Function] = useState("")
  const [startingPeriod, setStartingPeriod]: [number, Function] = useState(0)
  const [lockupPeriod, setPeriod]: [number, Function] = useState(5.0)
  const [timeUnit, setTimeUnit]: [TimeUnit, Function] = useState("YEAR")
  const [votingPerc, setVotingPerc]: [number, Function] = useState(100)

  const votingPercMarks = [
    {
      value: 25,
      label: '25%',
    },
    {
      value: 50,
      label: '50%',
    },
    {
      value: 75,
      label: '75%',
    },
    {
      value: 100,
      label: '100%',
    },
  ]

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

        <div>
          <div className="flex">
            <span className="flex-1">This many days after genesis:</span>
            <span className="flex">{startingPeriod}</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 font-extralight">
            &lt;&lt;&lt;&lt; lower is better
          </div>
          <Slider 
            id="start_date"
            defaultValue={0}
            min={0}
            max={500}
            value={startingPeriod}
            onChange={ (e, value) => setStartingPeriod(value)} 
            aria-labelledby="start-period"
          />
        </div>

        <div>
          <div className="flex">
            <span className="flex-1">With a dissolve period of:</span>
            <span className="flex">{lockupPeriod} year{lockupPeriod!=1?"s":""}</span>
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
            onChange={ (e, value) => setPeriod(value)} 
            aria-labelledby="lockup-period"
          />
        </div>

        <div className="flex flex-col space-y-3 pb-11">
          <div className="flex justify-center text-xl font-light">
            You can earn a daily return of up to
          </div>
          <div className="flex justify-center text-2xl">
            Some tokens
          </div>
        </div>
        
        <div className="">
          Neurons on the Internet Computer are active participants in the network's governance system, with votes placed on proposals or delegated to others. The more you participate, the higher your rewards.
        </div>
        <div>
          % of votes participated in:
        </div>
        <div>
          <Slider 
            id="voting percentage"
            defaultValue={75}
            min={0}
            max={100}
            step={25}
            value={votingPerc}
            marks={votingPercMarks}
            onChange={ (e, value) => setVotingPerc(value)} 
            aria-labelledby="voting-percentage"
          />
        </div>

      </form>
    </div>
  )
}

export default InputFields
