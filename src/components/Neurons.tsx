import React from "react"
import { useState } from "react"
import { GlobalParameters, NeuronType } from "../types/types"
import { Button, Paper } from "@material-ui/core"
import Neuron from "./Neuron"
import AdvancedSettings from "./inputFields/AdvancedSettings"
import PercentageSlider from "./inputFields/PercentageSlider"

const Neurons = (props: { initialId: string }) => {
  const standardParams = {
    stakeSize: 100,
    startDate: new Date("2021-03-31"),
    lockupPeriod: 5.0,
    votingPerc: 100,
    stakedPerc: 90,
    totalSupply: 476190476, //TODO remove
  }

  const [globalParameters, setGlobalParameters] = useState<GlobalParameters>({
    stakedPerc: 90,
    maturityLevel: 2,
    votingPerc: 100,
    averageDissolveDelay: 4,
    totalSupply: 476190476,
  })

  // advanced settings collapse
  const [open, setOpen] = useState(false)
  const handleAdvancedExpand = () => {
    setOpen(!open)
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
    const newId = randomString()
    const newNeurons = neurons.concat({ params: standardParams, data: [], index: neurons.length, id: newId })
    setNeurons(newNeurons)
    setExpanded(newId)
  }

  const handleDeleteNeuron = (id: string) => {
    const newNeurons = neurons
      .filter(neuron => neuron.id !== id)
      .map((neuron, index) => {
        return { ...neuron, index: index }
      })
    setNeurons(newNeurons)
  }

  const neuronComponents = neurons.map(neuron => {
    return (
      <Neuron
        key={neuron.id}
        neuron={neuron}
        expanded={neuron.id === expanded}
        handleExpand={handleExpand}
        handleDelete={handleDeleteNeuron}
        globalParameters={globalParameters}
      ></Neuron>
    )
  })

  return (
    <div>
      {neuronComponents}
      <Button variant="contained" color="primary" onClick={handleAddNeuron} className="w-full">
        Add Neuron
      </Button>
      <Paper className="px-4 py-2 my-4">
        <AdvancedSettings open={open} handleExpand={handleAdvancedExpand}>
          <PercentageSlider
            title="percentage locked inside voting neurons:"
            percentage={globalParameters.stakedPerc}
            setPerc={(x: number) => setGlobalParameters({ ...globalParameters, stakedPerc: x })}
            postfix="%"
            defaultValue={90}
            min={1}
            max={100}
            step={1}
          />
          <PercentageSlider
            title={"Percentage of proposals you vote on:"}
            percentage={globalParameters.votingPerc}
            setPerc={(x: number) => setGlobalParameters({ ...globalParameters, votingPerc: x })}
            postfix={"%"}
            min={0}
            max={100}
            step={1}
            defaultValue={100}
          />
          <PercentageSlider
            title={"Average neuron age:"}
            percentage={globalParameters.maturityLevel}
            setPerc={(x: number) => setGlobalParameters({ ...globalParameters, maturityLevel: x })}
            postfix={globalParameters.maturityLevel > 1 ? " years" : " year"}
            min={0}
            max={4}
            step={0.1}
            defaultValue={5}
          />
          <PercentageSlider
            title={"Average dissolve delay of all neurons:"}
            percentage={globalParameters.averageDissolveDelay}
            setPerc={(x: number) => setGlobalParameters({ ...globalParameters, averageDissolveDelay: x })}
            postfix={globalParameters.averageDissolveDelay > 1 ? " years" : " year"}
            min={0.5}
            max={8}
            step={0.1}
            defaultValue={4}
          />
          {/* <div>for now assumed constant total supply:</div> */}
          {/* <FormattedTextInput
          required={true}
          id="total supply"
          label="total supply"
          value={totalSupply}
          placeholder="total number of tokens"
          type="number"
          onChange={e => handleSupplyChange(e.target.value)}
          aria-labelledby="stake-size"
        ></FormattedTextInput> */}
        </AdvancedSettings>
      </Paper>
      <Paper>YOUR TOTAL RETURN AFTER 30 years is :</Paper>
    </div>
  )
}

export default Neurons
