import NumberFormat from "react-number-format"

export interface NeuronType {
  id: string
  stakeSize: number // unix timestamp
  startDate: number // unix timestamp
  lockupPeriod: number // number of months
  dissolveDelay: number // number of months
  data: Array<Datapoint>
  checked: boolean
}

export interface CalculatorParameters {
  stakeSize: number
  lockupPeriod: number
  startDate: Date
}
export interface Bucket {
  year: number
  timestamp: number
  value: number
}
export interface GlobalParameters {
  stakedPerc: number
  averageMaturityLevel: number // years
  votingPerc: number // perc of proposals you vote on yourself
  averageDissolveDelay: number // years
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
