import { CalculatorParameters, GlobalParameters } from "../types/types"
import { React } from "react"
interface Neuron {
  age_days: number
  locked_ICP: number
  dissolve_delay: number
}

function nominal_voting_rewards_available_today(icp_supply: number, days_since_genesis: number): number {
  // 8 years times 365.25 days is 2922 days
  const day = Math.min(days_since_genesis, 2922)
  const as_perc_of_annual = 0.05 + 0.05 * ((2922 - day) / 2922) ** 2

  return (icp_supply * as_perc_of_annual) / 365.25
}

function get_neuron_relative_max_rewards(n: Neuron): number {
  const effective_age = n.age_days > 1461 ? 1461 : n.age_days // max 4 yrs

  return (n.locked_ICP + (n.locked_ICP * n.dissolve_delay) / 2922) * (1 + (0.25 * effective_age) / 1461)
}

function get_sum_all_neuron_relative_max_rewards(neurons: [Neuron]): number {
  let s = 0
  for (let i = 0; i < neurons.length; i++) {
    s += get_neuron_relative_max_rewards(neurons[i])
  }

  return s
}

function get_neuron_maturity_increase(
  neuron: Neuron,
  vote_participation: number,
  all_neurons: [Neuron],
  icp_supply: number,
  days_since_genesis: number
): number {
  const pie = nominal_voting_rewards_available_today(icp_supply, days_since_genesis)
  const max_all_relative = get_sum_all_neuron_relative_max_rewards(all_neurons)
  const earned_relative = get_neuron_relative_max_rewards(neuron) * vote_participation
  const slice = (earned_relative / max_all_relative) * pie

  return slice / neuron.locked_ICP
}

const genesis = new Date(2021, 3, 31)

const daysSinceGenesis = (date: Date) => {
  let difference = date.getTime() - genesis.getTime()
  difference = Math.max(0, difference)
  return Math.ceil(difference / (1000 * 3600 * 24))
}

const createDataPoints = (params: CalculatorParameters, globalParameters: GlobalParameters) => {
  const datapoints = []

  const daysPastGenesis = daysSinceGenesis(params.startDate)
  let summedMaturity = 0
  const totalLockupPeriod = params.lockupPeriod * 365
  let currentDisolvePeriod = params.lockupPeriod * 365.25

  for (let i = 0; i < totalLockupPeriod; i++) {
    const currentDayPastGenesis = daysPastGenesis + i
    let currentDissolveDelay = Math.min(currentDisolvePeriod, 2922)
    const averageMaturity = Math.min(globalParameters.maturityLevel * 365, currentDayPastGenesis)
    // TODO add average dissolve delay to parameters
    // TODO dissolve delay should decrease to the end
    const myNeuron: Neuron = {
      age_days: i,
      locked_ICP: params.stakeSize,
      dissolve_delay: currentDissolveDelay,
    }

    // assuming one big neuron with all the other tokens for now, staked the same day as ours
    const allNeurons: [Neuron] = [
      {
        age_days: averageMaturity,
        locked_ICP: (globalParameters.totalSupply * globalParameters.stakedPerc) / 100,
        dissolve_delay: globalParameters.averageDissolveDelay * 365.25,
      },
    ]

    let maturityIncrease
    if (currentDissolveDelay > 182) {
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

    summedMaturity += maturityIncrease
    currentDisolvePeriod--

    if (i % 364 === 0) {
      datapoints.push({
        x: "year " + i / 364,
        y: summedMaturity * params.stakeSize,
        days: currentDayPastGenesis,
      })
    }
  }
  return datapoints
}

// const createDataPoints = (params: CalculatorParameters, stakedPerc: number, totalSupplyInput: number) => {
//   const daysPastGenesis = daysSinceGenesis(params.startDate)
//   const totalDaysStaked: number = Math.ceil(params.lockupPeriod * 365)
//   const totalSupply: number = totalSupplyInput ? totalSupplyInput : STANDARD_TOTAL_SUPPLY
//   const totalStakePerc: number = stakedPerc ? stakedPerc : STANDARD_PERCENTAGE_STAKED
//   const votingPerc: number = params.votingPerc ? params.votingPerc : STANDARD_VOTING_PERCENTAGE
//   const relativeStakePerc: number = params.stakeSize / (totalStakePerc * totalSupply)

//   const datapoints = []
//   let cumulativeReward = 0
//   for (let days = 0; days < totalDaysStaked; days++) {
//     const totalDailyReward: number = rewardFraction(daysPastGenesis + days) * totalSupply
//     const personalDailyReward: number = totalDailyReward * (1 / 365) * relativeStakePerc * votingPerc
//     cumulativeReward = cumulativeReward + personalDailyReward

//     if (days + 1 === totalDaysStaked) {
//       datapoints.push({
//         x: "release",
//         y: cumulativeReward, // should account for maturity somehow as well
//         days: days,
//       })
//     }
//     if (days % 365 === 0) {
//       datapoints.push({
//         x: days / 365 === 0 ? "creation" : "year " + days / 365,
//         y: cumulativeReward,
//         days: days,
//       })
//     }
//   }

//   return datapoints
// }

export default createDataPoints
