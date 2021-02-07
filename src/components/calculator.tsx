import React, { useState } from "react"
import * as styles from "./calculator.module.css"
import { Button, TextField } from "@material-ui/core"
import Chart from "./chart"

const Calculator = () => {
  const [stakeSize, setStake]: [string, Function] = useState("")
  const [lockupPeriod, setPeriod]: [string, Function] = useState("")
  const [votingPerc, setVotingPerc]: [string, Function] = useState("")
  const [chartParams, setChartParams]: [
    CalculatorParameters,
    Function
  ] = useState({ stakeSize: 0, lockupPeriod: 0, votingPerc: 0 })

  const handleSubmit = () => {
    try {
      const stakeSizeParam = parseInt(stakeSize)
      const lockupPeriodParam = parseInt(lockupPeriod)
      const votingPercParam = parseInt(votingPerc)
      setChartParams({
        stakeSize: stakeSizeParam,
        lockupPeriod: lockupPeriodParam,
        votingPerc: votingPercParam,
      })
    } catch {
      // todo set error state
    }
  }

  return (
    <div className={styles.calculator}>
      <form className={styles.inputFields}>
        <TextField
          required={true}
          id="ICP_Amount"
          label="stake size"
          value={stakeSize}
          variant="outlined"
          placeholder="ICP"
          type="number"
          onChange={e => setStake(e.target.value)}
        ></TextField>
        <TextField
          id="staking period"
          required={true}
          label="staking period"
          margin="normal"
          value={lockupPeriod}
          variant="outlined"
          placeholder="number of years"
          type="number"
          onChange={e => setPeriod(e.target.value)}
        ></TextField>
        <TextField
          id="voting percentage"
          required={true}
          label="voting percentage"
          margin="normal"
          value={votingPerc}
          variant="outlined"
          placeholder="percentage"
          type="number"
          onChange={e => setVotingPerc(e.target.value)}
        ></TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmit()}
        >
          calculate
        </Button>
      </form>
      <Chart parameters={chartParams}></Chart>
    </div>
  )
}

export default Calculator
