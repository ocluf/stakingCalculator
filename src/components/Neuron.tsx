import React, { useState } from "react"
import Accordion from "@material-ui/core/Accordion"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import { CalculatorParameters, NeuronType } from "../types/types"
import createDataPoints from "./calcdatapoints"
import InputFields from "./inputFields/InputFields"
import CalculationOutcome from "./CalculationOutcome"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Chart from "./Chart"
import { Button, Container } from "@material-ui/core"

const Neuron = (props: { neuron: NeuronType; expanded: boolean; handleExpand: Function; handleDelete: Function }) => {
  const neuronName = "Neuron " + (props.neuron.index + 1)
  const [data, setData] = useState([])

  const reward = data.slice(-1)[0]?.y.toFixed(2)
  const setCalcParams = (calcParams: CalculatorParameters) => {
    const data = createDataPoints(calcParams)
    setData(data)
    // add function for recalculating total neuron reward
    // useMemo to prevent rerendering of neuron component?
  }

  return (
    <Accordion expanded={props.expanded} onChange={props.handleExpand(props.neuron.id)} className="mt-5 mb-5">
      <AccordionSummary expandIcon={<ExpandMoreIcon />} className="flex">
        <div>{neuronName}</div>
        <div className="flex-1 text-right text-gray-500">{reward ? "~" + reward + " ICP" : ""} </div>
      </AccordionSummary>
      <AccordionDetails>
        <Container className="flex flex-col space-y-4">
          <InputFields calcParams={props.neuron.params} calculate={setCalcParams} />
          <CalculationOutcome calcParams={props.neuron.params} reward={reward ? reward : "0"} neuronName={neuronName} />
          <Container className="border border-gray-300 w-full h-96">
            <Chart data={data} />
          </Container>
          {props.neuron.index === 0 ? null : (
            <Button
              variant="contained"
              color="secondary"
              className="float-right"
              onClick={() => props.handleDelete(props.neuron.id)}
            >
              Delete
            </Button>
          )}
        </Container>
      </AccordionDetails>
    </Accordion>
  )
}

export default Neuron
