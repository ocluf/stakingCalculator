import NumberFormat from "react-number-format"

interface CalculatorParameters {
  stakeSize: number
  lockupPeriod: number
  startDate: Date
  votingPerc?: number
  totalSupply?: number
  stakedPerc?: number
}

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}
