import NumberFormat from "react-number-format"

interface CalculatorParameters {
  stakeSize: number
  lockupPeriod: number
  startDate: Date
  votingPerc?: number
}

interface GlobalParameters {
  stakedPerc: number
  maturityLevel: number
  votingPerc: number
  averageDissolveDelay: number
  totalSupply: number
}

interface Datapoint {
  x: string
  y: number
}

interface NeuronType {
  params: CalculatorParameters
  data: Array<Datapoint>
  index: number
  id: string
}

interface ResultData {
  stake: number
  reward: number | null
  stakePeriod: number
  // startData: Date
  // neuronId: string
}

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}
