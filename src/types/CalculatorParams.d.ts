interface CalculatorParameters {
  stakeSize: number
  lockupPeriod: number
  timeUnit: TimeUnit
  totalSupply: number
  stakedPerc: number
  startDate: Date
  votingPerc: number
}

type TimeUnit = "YEAR" | "MONTH"
