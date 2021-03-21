import React from "react"
import { useState } from "react"
import { CalculatorParameters, NeuronType } from "../types/types"
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
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import Neuron from "./Neuron"

const Neurons = (props: { initialId: string }) => {
  const standardParams = {
    stakeSize: 100,
    startDate: new Date("2021-03-31"),
    lockupPeriod: 5.0,
    votingPerc: 100,
    stakedPerc: 90,
    totalSupply: 476190476,
  }

  const randomString = () => {
    return new Date().getTime().toString() + "-" + Math.random().toString
  }

  const [expanded, setExpanded] = useState<string | false>(props.initialId)
  const handleExpand = (id: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? id : false)
  }

  const [neurons, setNeurons]: [Array<NeuronType>, Function] = useState([
    {
      params: standardParams,
      data: [],
      index: 0,
      id: props.initialId,
    },
  ])

  const handleAddNeuron = () => {
    const newNeurons = neurons.concat({ params: standardParams, data: [], index: neurons.length, id: randomString() })
    setNeurons(newNeurons)
  }

  const handleDeleteNeuron = (id: string) => {
    const newNeurons = neurons
      .filter(neuron => neuron.id !== id)
      .map((neuron, index) => {
        return { ...neuron, index: index }
      })
    setNeurons(newNeurons)
  }

  return (
    <div>
      {neurons.map(neuron => {
        return (
          <Neuron
            key={neuron.id}
            neuron={neuron}
            expanded={neuron.id === expanded}
            handleExpand={handleExpand}
            handleDelete={handleDeleteNeuron}
          ></Neuron>
        )
      })}
      <Button variant="contained" color="primary" onClick={handleAddNeuron} className="w-full">
        Add Neuron
      </Button>
    </div>
  )
}

export default Neurons
