import Card from "@material-ui/core/Card"
import { Link } from "gatsby"
import React from "react"
import NumberFormat from "react-number-format"
import { ResultData } from "../types/types"

const CalculationOutcome = (props: { resultData: Array<ResultData> }) => {
  const getEndDateMs = (date: Date, lockupPeriod: number) => {
    return date.getTime() + lockupPeriod * 365 * 86400000
  }

  let totalReward: number
  let totalStake: number
  let latestEndDate: Date
  if (props.resultData.length > 1) {
    totalReward = props.resultData.map(result => result.reward).reduce((acc, current) => acc + current)
    totalStake = props.resultData.reduce((acc, current) => acc + current.stake, 0)
    const latestEndDateNumber = props.resultData.reduce(
      (acc, current) => Math.max(acc, getEndDateMs(current.startData, current.stakePeriod)),
      0
    )
    latestEndDate = new Date(latestEndDateNumber)
  }
  return (
    <>
      {props.resultData.length > 1 ? (
        <Card className="p-7">
          <h1 className="font-bold text-xl">Total Return</h1>
          <br /> On <span className="font-bold">{latestEndDate.toDateString()}</span>, with a total stake of
          <span className="font-bold">
            {" "}
            <NumberFormat value={totalStake} thousandSeparator displayType={"text"}></NumberFormat> ICP
          </span>
          , your total return for all neurons combined would be
          <span className="font-bold">
            {" "}
            <NumberFormat value={totalReward} thousandSeparator displayType={"text"}></NumberFormat> ICP
          </span>{" "}
          <br></br>
          <br></br>
          <span className="text-sm text-gray-500">
            Your actual return may differ, to see why check out the{" "}
            <Link className="text-blue-500 no-underline hover:underline" to="/FAQ/">
              FAQ
            </Link>
          </span>
        </Card>
      ) : null}
    </>
  )
}

export default CalculationOutcome
