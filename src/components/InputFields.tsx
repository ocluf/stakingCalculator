import React, { useState } from "react"
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core"
import InputAdornment from "@material-ui/core/InputAdornment"

const InputFields = () => {
  // standard fields
  const [stakeSize, setStake]: [string, Function] = useState("")
  const [lockupPeriod, setPeriod]: [string, Function] = useState("")
  const [timeUnit, setTimeUnit]: [TimeUnit, Function] = useState("YEAR")
  const [votingPerc, setVotingPerc]: [string, Function] = useState("")

  // add calendar field for starting date

  // add advanced setting folder with
  // expected total amount staked
  // total supply
  // expected average maturity

  return (
    <form className="flex flex-col space-y-4 max-w-sm m-3">
      <TextField
        required={true}
        id="ICP_Amount"
        label="stake size"
        value={stakeSize}
        variant="outlined"
        placeholder="number of icp staked"
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">ICP</InputAdornment>,
        }}
        onChange={e => setStake(e.target.value)}
      ></TextField>
      <div className="flex flex-row space-x-4">
        <TextField
          id="staking period"
          required={true}
          label="staking period"
          value={lockupPeriod}
          variant="outlined"
          placeholder="number of years"
          type="number"
          onChange={e => setPeriod(e.target.value)}
        ></TextField>
        <FormControl className="flex-1" variant="outlined">
          <InputLabel id="time unit select label">time unit</InputLabel>
          <Select
            labelId="time unit select label"
            id="time unit select"
            value={timeUnit}
            onChange={unit => setTimeUnit(unit)}
            label="Time unit"
          >
            <MenuItem value={"YEAR"}>Years</MenuItem>
            <MenuItem value={"MONTH"}>Months</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TextField
        id="voting percentage"
        required={true}
        label="voting percentage"
        value={votingPerc}
        variant="outlined"
        placeholder="percentage"
        type="number"
        onChange={e => setVotingPerc(e.target.value)}
      />
      <Button variant="contained" color="primary">
        calculate
      </Button>
    </form>
  )
}

export default InputFields
