import { CalculatorParameters } from "../types/types"

// const STANDARD_TOTAL_SUPPLY = 1000000
// const STANDARD_PERCENTAGE_STAKED = 0.9
// const STANDARD_VOTING_PERCENTAGE = 1
// const genesis = new Date(2021, 3, 31)

// const daysSinceGenesis = (date: Date) => {
//   let difference = date.getTime() - genesis.getTime()
//   difference = Math.max(0, difference)
//   return Math.ceil(difference / (1000 * 3600 * 24))
// }

// const rewardFraction = (daysSinceGenesis: number) => {
//   return (5 * 0.75 ** (daysSinceGenesis / 200) + 5) / 100
// }

// const createDataPoints = (params: CalculatorParameters) => {
//   const daysPastGenesis = daysSinceGenesis(params.startDate)
//   const totalDaysStaked: number = Math.ceil(params.lockupPeriod * 365)
//   const totalSupply: number = params.totalSupply ? params.totalSupply : STANDARD_TOTAL_SUPPLY
//   const totalStakePerc: number = params.stakedPerc ? params.stakedPerc : STANDARD_PERCENTAGE_STAKED
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


interface Neuron {
  age_days: number,
  locked_ICP: number,
  dissolve_delay: number,
}

function nominal_voting_rewards_available_today(icp_supply: number, days_since_genesis: number): number {
  // 8 years times 365.25 days is 2922 days
  const day = Math.min(days_since_genesis, 2922);
  const as_perc_of_annual = 0.05 + 0.05 * ((2922 - day) / 2922)**2;
  
  return icp_supply * as_perc_of_annual / 365.25;
}

function get_neuron_relative_max_rewards(n: Neuron) : number {
  const effective_age = n.age_days > 1461 ? 1461 : n.age_days;  // max 4 yrs
  
  return (n.locked_ICP + n.locked_ICP * n.dissolve_delay/2922)* ( 1 + 0.25 * effective_age / 1461);
}

function get_sum_all_neuron_relative_max_rewards(neurons: [Neuron]): number {
  let s = 0;
  for (let i = 0; i < neurons.length; i++) {
    s += get_neuron_relative_max_rewards(neurons[i]);
  }

  return s;    
}

function get_neuron_maturity_increase(neuron: Neuron, vote_participation: number, all_neurons: [Neuron], 
                                      icp_supply: number, days_since_genesis: number):  number {
  const pie = nominal_voting_rewards_available_today(icp_supply, days_since_genesis);
  const max_all_relative = get_sum_all_neuron_relative_max_rewards(all_neurons);
  const earned_relative = get_neuron_relative_max_rewards(neuron)*vote_participation
  const slice = earned_relative/max_all_relative*pie

  return slice / neuron.locked_ICP;
}

const createDataPoints = (params: CalculatorParameters) => {
  const datapoints = []

  let summedMaturity = 0;
  const lockupPeriodInDays = params.lockupPeriod * 365.25;

  for (let i = 0; i < 2922; i++) {
    if (i%30 === 0) {     // temp to reduce calculations to once a month

      const myNeuron: Neuron = { age_days: i, locked_ICP: params.stakeSize, dissolve_delay: lockupPeriodInDays};

      // assuming one big neuron has 90% of the tokens for now, staked the same day as ours
      const allNeurons: [Neuron] = [{age_days: i, locked_ICP: params.totalSupply*params.stakedPerc/100, dissolve_delay: 2922 }];

      const maturityIncrease = get_neuron_maturity_increase(myNeuron, params.votingPerc/100, allNeurons, params.totalSupply, i);

      summedMaturity += maturityIncrease;
      
      datapoints.push({
        x: i,
        y: summedMaturity,
        days: i,
      })

    }
  }

  return datapoints
}

export default createDataPoints
