import React from "react"
import styles from "./calculator.module.css"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

export default function Chart(props: { parameters: CalculatorParameters }) {
  const interest = 0.05
  const calcInterest = (
    principal: number,
    interest: number,
    years: number,
    votingPerc: number
  ) => {
    return (
      ((principal * (1 + interest) ** years - principal) * votingPerc) / 100
    )
  }

  const createData = () => {
    let data = []
    data.push({ year: 0, interest: 0 })
    for (let i = 0; i < props.parameters.lockupPeriod; i++) {
      data.push({
        year: i + 1,
        interest: calcInterest(
          props.parameters.stakeSize,
          interest,
          i + 1,
          props.parameters.votingPerc
        ),
      })
    }
    return data
  }

  return (
    <ResponsiveContainer>
      <LineChart width={500} height={300} data={createData()}>
        <XAxis
          dataKey="year"
          name="years"
          // label={{ value: "Years", position: "insideBottomRight", offset: 0 }}
        />
        <YAxis
        //label={{ value: "ICP earned", angle: -90, position: "insideLeft" }}
        />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line
          type="monotone"
          dataKey="interest"
          strokeWidth={4}
          stroke="#8884d8"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
