import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
  name: "Neurons",
  initialState: [
    {
      id: "test",
    },
  ],
  reducers: {},
})

const calculatorAppState = {
  neurons: [
    {
      id: "asdasd",
      stakeSize: 100,
      stakingPeriod: 4,
      startDate: new Date(),
    },
  ],
  neuronData: [
    {
      id: "asdasd",
      data: { x: "year0", y: 123 },
    },
  ],
  globalParameters: {
    totalStakedPerc: 90,
    votingPerc: 100,
    averageNeuronAge: 2,
    averageDissDelay: 4,
  },
}

const actions = [
  {
    type: "neuron/neuronChanged",
    payload: { id: "asdasd", stakeSize: 101, stakingPeriod: 4, startDate: new Date() },
  },
  {
    type: "neuron/dataChanged",
    payload: { id: "asdasd", data: { x: "year0", y: 1233 } },
  },
  {
    type: "globalParameters/globalParametersChanged",
    payload: {
      totalStakedPerc: 95,
      votingPerc: 100,
      averageNeuronAge: 2,
      averageDissDelay: 4,
    },
  },
]
