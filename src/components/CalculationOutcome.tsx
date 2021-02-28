import Card from "@material-ui/core/Card"
import { Link } from "gatsby"
import React from "react"

const CalculationOutcome = (props: { calcParams: CalculatorParameters | null; reward: string }) => {
  return (
    <>
      {props.calcParams ? (
        <Card className="p-7">
          After <span className="font-bold">{props.calcParams?.lockupPeriod} years</span>, with a stake of
          <span className="font-bold"> {props.calcParams?.stakeSize} ICP</span>, your total return would be
          <span className="font-bold"> {props.reward} ICP</span> <br></br>
          <br></br>
          <span className="text-sm text-gray-500">
            Your actual return may differ, to see why checkout the{" "}
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
