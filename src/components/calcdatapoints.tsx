const NR_OFF_DATA_POINTS = 20
const STANDARD_TOTAL_SUPPLY = 1000000
const STANDARD_PERCENTAGE_STAKED = 0.9
const STANDARD_VOTING_PERCENTAGE = 1
const genesis = new Date(2021, 3, 31)

const daysSinceGenesis = (date: Date) => {
  let difference = date.getTime() - genesis.getTime()
  difference = Math.max(0, difference)
  return Math.ceil(difference / (1000 * 3600 * 24))
}

const rewardFraction = (daysSinceGenesis: number) => {
  return (5 * 0.75 ** (daysSinceGenesis / 200) + 5) / 100
}

const createDataPoints = (params: CalculatorParameters) => {
  const daysPastGenesis = daysSinceGenesis(params.startDate)
  const totalDaysStaked: number = params.lockupPeriod * 365
  const totalSupply: number = params.totalSupply ? params.totalSupply : STANDARD_TOTAL_SUPPLY
  const totalStakePerc: number = params.stakedPerc ? params.stakedPerc : STANDARD_PERCENTAGE_STAKED
  const votingPerc: number = params.votingPerc ? params.votingPerc : STANDARD_VOTING_PERCENTAGE
  const relativeStakePerc: number = params.stakeSize / (totalStakePerc * totalSupply)

  const datapoints = []
  let cumulativeReward = 0
  for (let days = 0; days < totalDaysStaked; days++) {
    const totalDailyReward: number = rewardFraction(daysPastGenesis + days) * totalSupply
    const personalDailyReward: number = totalDailyReward * (1 / 365) * relativeStakePerc * votingPerc
    cumulativeReward = cumulativeReward + personalDailyReward
    const datapoint = {
      x: days,
      y: cumulativeReward, // should account for maturity somehow as well
    }

    const modulo = Math.ceil(totalDaysStaked / NR_OFF_DATA_POINTS)
    if (days % modulo === 0) {
      datapoints.push(datapoint)
    }
  }

  return datapoints
}

export default createDataPoints
