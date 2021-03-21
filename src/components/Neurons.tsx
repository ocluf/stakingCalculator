import React from "react"
import { useState } from "react"
import { CalculatorParameters, Neuron } from "../types/types"
import createDataPoints from "../components/calcdatapoints"
import InputFields from "./inputFields/InputFields"
import Chart from "./Chart"
import CalculationOutcome from "./CalculationOutcome"
import NeuronSelector from "./NeuronSelector"
import TabContext from "@material-ui/lab/TabContext"
import TabList from "@material-ui/lab/TabList"
import TabPanel from "@material-ui/lab/TabPanel"
import Tab from "@material-ui/core/Tab"
import { Button, Paper } from "@material-ui/core"
import ReturnTable from "./ReturnTable"

const Neurons = () => {
  const standardParams = {
    stakeSize: 100,
    startDate: new Date("2021-03-31"),
    lockupPeriod: 5.0,
    votingPerc: 100,
    stakedPerc: 90,
    totalSupply: 476190476,
  }

  const [neurons, setNeurons]: [Array<Neuron>, Function] = useState([
    {
      params: standardParams,
      data: [],
      index: 0,
    },
  ])
  const [index, setIndex]: [number, Function] = useState(0)
  const reward = neurons[index].data.slice(-1)[0]?.y.toFixed(2)

  const handleAddNeuron = () => {
    const newNeurons = neurons.concat({ params: standardParams, data: [], index: neurons.length })
    setNeurons(newNeurons)
  }

  const setCalcParams = (calcParams: CalculatorParameters) => {
    const data = createDataPoints(calcParams)
    const newNeurons = neurons.map(neuron => {
      if (neuron.index === index) {
        neuron.data = data
        neuron.params = calcParams
        return neuron
      } else {
        return neuron
      }
    })
    setNeurons(newNeurons)
  }

  return (
    <div className="flex flex-col p-3 space-y-4 max-w-lg mx-auto">
      <InputFields calcParams={neurons[index].params} calculate={setCalcParams} />
      <Button variant="contained" color="primary" onClick={handleAddNeuron}>
        Add Neuron
      </Button>
      <TabContext value={index.toString()}>
        <Paper square>
          <TabList
            selectionFollowsFocus
            indicatorColor="primary"
            onChange={(event, value) => setIndex(parseInt(value))}
            aria-label="simple tabs example"
          >
            {neurons.map(neuron => (
              <Tab key={neuron.index} label={"Neuron " + (neuron.index + 1)} value={neuron.index.toString()}></Tab>
            ))}
          </TabList>
        </Paper>
      </TabContext>
      <CalculationOutcome
        calcParams={neurons[index].params}
        reward={reward ? reward : "0"}
        neuronName={"Neuron " + (index + 1)}
      />
      <ReturnTable
        stakeSize={neurons[index].params.stakeSize}
        startDate={neurons[index].params.startDate}
        data={neurons[index].data}
      />
      <div className="border border-gray-300 w-full h-96">
        <Chart data={neurons[index].data} />
      </div>
    </div>
  )
}

export default Neurons
