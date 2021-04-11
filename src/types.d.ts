import NumberFormat from "react-number-format"

export interface NeuronType {
  id: string
  stakeSize: number
  startDate: number
  lockupPeriod: number // number of years
  data: Array<Datapoint>
  checked: boolean
}

export interface CalculatorParameters {
  stakeSize: number
  lockupPeriod: number
  startDate: Date
}

export interface GlobalParameters {
  stakedPerc: number
  averageMaturityLevel: number
  votingPerc: number
  averageDissolveDelay: number
  totalSupply: number
}

export interface Datapoint {
  x: number
  y: number
}

export interface ResultData {
  stake: number
  reward: number | null
  stakePeriod: number
  // startData: Date
  // neuronId: string
}

export interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}
