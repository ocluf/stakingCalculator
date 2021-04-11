import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { nanoid } from "nanoid"
import { GlobalParameters, NeuronType } from "../types"
import calculateDataPoints from "../calcdatapoints"

type SliceState = {
  neurons: Array<NeuronType>
  globalParameters: GlobalParameters
  currenNeuronId: string | null
  showAdvanced: boolean
  exchangeRate: number
}
const initialGlobalParamaters: GlobalParameters = {
  stakedPerc: 90,
  votingPerc: 100,
  averageDissolveDelay: 2,
  totalSupply: 476190476,
  averageMaturityLevel: 2,
}

const getRoundedDownDate = () => {
  let date = new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date.getTime()
}

const createNeuron: Function = (globalParameters: GlobalParameters): NeuronType => {
  let initialNeuron = {
    id: nanoid(),
    stakeSize: 100,
    lockupPeriod: 5,
    startDate: getRoundedDownDate(),
    data: [],
    checked: true,
  }
  initialNeuron = { ...initialNeuron, data: calculateDataPoints(initialNeuron, globalParameters) }
  return initialNeuron
}

const initialNeuron = createNeuron(initialGlobalParamaters)

const initialState: SliceState = {
  neurons: [initialNeuron],
  globalParameters: initialGlobalParamaters,
  currenNeuronId: initialNeuron.id,
  showAdvanced: false,
  exchangeRate: 4.2,
}

interface NeuronNumberUpdate {
  id: string
  number: number
}

interface NeuronUpdate {
  id: string
}

// lots of logic repeated for neuron changes could be refactored to a function or become one neuron update event
const neuronSlice = createSlice({
  name: "Neurons",
  initialState,
  reducers: {
    addNeuron: state => {
      const newNeuron: NeuronType = createNeuron(state.globalParameters)
      state.neurons = state.neurons.concat(newNeuron)
      state.currenNeuronId = newNeuron.id
    },
    deleteNeuron: (state, action: PayloadAction<NeuronUpdate>) => {
      state.neurons = state.neurons.filter(neuron => neuron.id !== action.payload.id)
    },
    changeStakeSize: (state, action: PayloadAction<NeuronNumberUpdate>) => {
      state.neurons = state.neurons.map(neuron => {
        if (neuron.id === action.payload.id) {
          let newNeuron = { ...neuron, stakeSize: action.payload.number }
          const dataPoints = calculateDataPoints(newNeuron, state.globalParameters)
          newNeuron.data = dataPoints
          return newNeuron
        } else {
          return neuron
        }
      })
    },
    changeLockupPeriod: (state, action: PayloadAction<NeuronNumberUpdate>) => {
      state.neurons = state.neurons.map(neuron => {
        if (neuron.id === action.payload.id) {
          let newNeuron = { ...neuron, lockupPeriod: action.payload.number }
          const dataPoints = calculateDataPoints(newNeuron, state.globalParameters)
          newNeuron.data = dataPoints
          return newNeuron
        } else {
          return neuron
        }
      })
    },
    changeStartDate: (state, action: PayloadAction<NeuronNumberUpdate>) => {
      state.neurons = state.neurons.map(neuron => {
        if (neuron.id === action.payload.id) {
          let newNeuron = { ...neuron, startDate: action.payload.number }
          const dataPoints = calculateDataPoints(newNeuron, state.globalParameters)
          newNeuron.data = dataPoints
          return newNeuron
        } else {
          return neuron
        }
      })
    },
    changeExpanded: (state, action: PayloadAction<NeuronUpdate>) => {
      if (state.currenNeuronId === action.payload.id) {
        state.currenNeuronId = null
      } else {
        state.currenNeuronId = action.payload.id
      }
    },
    changeGlobalParameters: (state, action: PayloadAction<GlobalParameters>) => {
      state.globalParameters = action.payload
      state.neurons = state.neurons.map(neuron => {
        return { ...neuron, data: calculateDataPoints(neuron, action.payload) }
      })
    },
    toggleChecked: (state, action: PayloadAction<string>) => {
      state.neurons = state.neurons.map(neuron => {
        if (neuron.id === action.payload) {
          return { ...neuron, checked: !neuron.checked }
        } else {
          return neuron
        }
      })
    },
    toggleGlobalChecked: (state, action: PayloadAction<boolean>) => {
      state.neurons = state.neurons.map(neuron => {
        return { ...neuron, checked: action.payload }
      })
    },
    toggleAdvanced: state => {
      state.showAdvanced = !state.showAdvanced
    },
  },
})

export const {
  addNeuron,
  deleteNeuron,
  changeStakeSize,
  changeLockupPeriod,
  changeStartDate,
  changeExpanded,
  changeGlobalParameters,
  toggleAdvanced,
  toggleChecked,
  toggleGlobalChecked,
} = neuronSlice.actions

export const store = configureStore({
  reducer: neuronSlice.reducer,
})

export const standardGlobalParameters = initialGlobalParamaters

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
