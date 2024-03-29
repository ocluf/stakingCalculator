import { Bucket, CalculatorParameters, GlobalParameters, NeuronType } from "./types"

interface Neuron {
  age_days: number
  locked_ICP: number
  dissolve_delay: number
  isDissolving: boolean
}

/**
 * Gets the total reward pie to be divided for a single day
 * @param total_icp_supply the total ICP supply that day
 * @param days_since_genesis the number of days since genesis
 * @returns The number of ICP to be divided between neurons
 */
function nominal_voting_rewards_available_today(icp_supply: number, days_since_genesis: number): number {
  // 8 years times 365.25 days is 2922 days
  const day = Math.min(days_since_genesis, 2922)
  const as_perc_of_annual = 0.05 + 0.05 * ((2922 - day) / 2922) ** 2

  return (icp_supply * as_perc_of_annual) / 365
}

/**
 * Get a number representing the relative rewards a neuron should get compared to other neurons. based on age
 * stake and dissolve delay.
 * @param n The neuron
 * @returns the relative reward number
 */
function get_neuron_relative_max_rewards(n: Neuron): number {
  let effective_age
  if (n.isDissolving) {
    effective_age = 0
  } else {
    effective_age = Math.min(1461, n.age_days) // max 4 yrs
  }

  return (n.locked_ICP + (n.locked_ICP * n.dissolve_delay) / 2922) * (1 + (0.25 * effective_age) / 1461)
}

/**
 * adds the relative rewards number of all neurons together so that the percentage can be determined.
 * @param neurons all neurons
 * @returns the total
 */
function get_sum_all_neuron_relative_max_rewards(neurons: [Neuron]): number {
  let s = 0
  for (let i = 0; i < neurons.length; i++) {
    s += get_neuron_relative_max_rewards(neurons[i])
  }

  return s
}

/**
 * Calculates the maturity increase for a neuron on a single day.
 * @param neuron the neuron for which to calculate the maturity increase
 * @param vote_participation the percentage of proposals the neuron particicpated in
 * @param all_neurons the other neurons in the network
 * @param icp_supply  the total ICP supply
 * @param days_since_genesis  the number of days since genesis
 * @returns the maturity increase for the neuron
 */
function get_neuron_maturity_increase(
  neuron: Neuron,
  vote_participation: number,
  all_neurons: Array<Neuron>,
  icp_supply: number,
  days_since_genesis: number
): number {
  const pie = nominal_voting_rewards_available_today(icp_supply, days_since_genesis)
  const max_all_relative = get_sum_all_neuron_relative_max_rewards(all_neurons) // asumes a 100% vote participation from other neurons
  const earned_relative = get_neuron_relative_max_rewards(neuron) * vote_participation
  const earned_pie_slice = (earned_relative / max_all_relative) * pie

  return earned_pie_slice / neuron.locked_ICP
}

const genesis = new Date(2021, 5, 7)
const dayMs = 1000 * 60 * 60 * 24

/**
 * Returns the number of days past genesis the given timestamp is
 * @param timestamp a unix timestamp
 * @returns the number of days past since genesis
 */
const daysSinceGenesis = (timestamp: number) => {
  let difference = timestamp - genesis.getTime()
  difference = Math.max(0, difference)
  return Math.ceil(difference / dayMs)
}

/**
 * Gets the nr of days in the stake period
 * @param startDate the lockup date
 * @param nrOfMonths the stakePeriod in number of months
 * @returns
 */
const getStakePeriodDays = (startDate: number, nrOfMonths: number): number => {
  const stakeDate: Date = new Date(startDate)
  const endDate: Date = new Date(stakeDate)
  endDate.setMonth(endDate.getMonth() + nrOfMonths)
  const diff: number = Math.abs(stakeDate.getTime() - endDate.getTime())
  return Math.ceil(diff / dayMs)
}

/**
 * Calculates the earned stake from a neuron over time
 * @param neuron The neuron for which to calculate the rewards
 * @param globalParameters The assumptions over the network/other neurons
 * @returns datapoints where x: the year and y: the rewards so far.
 */
const createDataPoints = (neuron: NeuronType, globalParameters: GlobalParameters) => {
  const datapoints = []
  let stakeEarnedSoFar = 0
  if (isNaN(neuron.stakeSize)) {
    return [{ x: "year 0", y: 0 }]
  }

  let maturity = 0
  const daysPastGenesis = daysSinceGenesis(neuron.startDate)
  const totalLockupPeriodDays = getStakePeriodDays(neuron.startDate, neuron.lockupPeriod)
  let daysRemaining = getStakePeriodDays(neuron.startDate, neuron.lockupPeriod)

  for (let i = 0; i < totalLockupPeriodDays; i++) {
    const currentDayPastGenesis = daysPastGenesis + i

    let dissolveDelay = Math.min(daysRemaining, Math.ceil(neuron.dissolveDelay * 30.5))
    const averageAge = Math.min(globalParameters.averageAge * 365, currentDayPastGenesis)

    const myNeuron: Neuron = {
      age_days: i,
      locked_ICP: neuron.stakeSize,
      dissolve_delay: dissolveDelay,
      isDissolving: dissolveDelay < neuron.dissolveDelay * 30.5,
    }

    // assuming one big neuron with all the other tokens
    const allNeurons: Array<Neuron> = [
      myNeuron,
      {
        age_days: averageAge,
        locked_ICP: globalParameters.totalSupply * (globalParameters.stakedPerc / 100) - neuron.stakeSize,
        dissolve_delay: globalParameters.averageDissolveDelay * 365,
        isDissolving: false,
      },
    ]

    let maturityIncrease
    // can't vote when dissolve delay <= 182 so also can't earn rewards
    if (dissolveDelay > 182) {
      maturityIncrease = get_neuron_maturity_increase(
        myNeuron,
        globalParameters.votingPerc / 100,
        allNeurons,
        globalParameters.totalSupply,
        currentDayPastGenesis
      )
    } else {
      maturityIncrease = 0
    }

    maturity += maturityIncrease
    daysRemaining--

    if (i % 364 === 0) {
      const stakeThisYear = maturity * neuron.stakeSize - stakeEarnedSoFar //add stake earned past year
      datapoints.push({
        x: neuron.startDate + i * dayMs,
        y: stakeThisYear,
      })
      stakeEarnedSoFar += stakeThisYear
    }
  }
  return datapoints
}

const yearMs = 1000 * 60 * 60 * 24 * 365

const getLowestCheckedStartDate = (neurons: Array<NeuronType>): number =>
  neurons.reduce((acc, neuron) => {
    return neuron.checked ? Math.min(acc, neuron.startDate) : acc
  }, Infinity)

export const isNeuronValid = (neuron: NeuronType) => {
  return neuron.dissolveDelay <= neuron.lockupPeriod
}

export const allNeuronsValid = (neurons: Array<NeuronType>) => {
  return neurons.every(neuron => isNeuronValid(neuron))
}

export const getHighestCheckedEndDate = (neurons: Array<NeuronType>): number =>
  neurons.reduce((acc, neuron) => {
    return neuron.checked
      ? Math.max(acc, neuron.startDate + getStakePeriodDays(neuron.startDate, neuron.lockupPeriod) * dayMs)
      : acc
  }, 0)

export const getTotalCheckedStake = (neurons: Array<NeuronType>): number =>
  neurons.reduce((acc, neuron) => acc + (neuron.checked ? neuron.stakeSize : 0), 0)

export const getTotalCheckedReturn = (neurons: Array<NeuronType>): number =>
  neurons.reduce(
    (acc, neuron) =>
      acc +
      (neuron.data.length > 1 && neuron.checked ? neuron.data.reduce((acc, datapoint) => acc + datapoint.y, 0) : 0),
    0
  )

const getNrYears = (lowestCheckedStartDate: number, highestCheckedEndDate: number) => {
  return Math.ceil((highestCheckedEndDate - lowestCheckedStartDate) / yearMs)
}

export const getNrYearsFromNeurons = (neurons: Array<NeuronType>) => {
  return getNrYears(getLowestCheckedStartDate(neurons), getHighestCheckedEndDate(neurons))
}

export const calculateCombinedDatapoints = (neurons: Array<NeuronType>) => {
  const lowestCheckedStartDate: number = getLowestCheckedStartDate(neurons)

  const highestCheckedEndDate: number = getHighestCheckedEndDate(neurons)

  const totalStake = getTotalCheckedStake(neurons)

  const nrOfYears: number = getNrYears(lowestCheckedStartDate, highestCheckedEndDate)

  let yearlyBuckets: Array<Bucket> = []
  for (let i = 0; i < nrOfYears + 1; i++) {
    yearlyBuckets.push({
      year: i,
      timestamp: lowestCheckedStartDate + i * yearMs,
      value: 0,
    })
  }

  const putInBucket = (timestamp: number, value: number) => {
    const bucketIndex = yearlyBuckets.findIndex(bucket => bucket.timestamp >= timestamp)
    if (bucketIndex === -1) {
      console.error("should find at least one bucket")
      return
    }
    const oldBucket = yearlyBuckets[bucketIndex]
    const newBucket = { ...oldBucket, value: oldBucket.value + value }
    yearlyBuckets[bucketIndex] = newBucket
  }

  neurons
    .filter(neuron => neuron.checked)
    .forEach(neuron => neuron.data.forEach(dataPoint => putInBucket(dataPoint.x, dataPoint.y)))

  const finalData = yearlyBuckets
    .filter(bucket => bucket.value !== 0)
    .map(bucket => {
      return { x: bucket.year, y: bucket.value }
    })
    .map(
      (sum => datapoint => {
        return { ...datapoint, y: (sum += datapoint.y) }
      })(0)
    )
    .map(datapoint => {
      return { ...datapoint, y: datapoint.y + totalStake }
    })

  return finalData
}

export default createDataPoints
