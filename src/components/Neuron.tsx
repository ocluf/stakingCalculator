import React, { forwardRef, useEffect, useRef, useState } from "react"
import Accordion from "@material-ui/core/Accordion"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import { CalculatorParameters, NeuronType, GlobalParameters, ResultData } from "../types/types"
import createDataPoints from "./calcdatapoints"
import InputFields from "./inputFields/InputFields"
import CalculationOutcome from "./CalculationOutcome"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Chart from "./Chart"
import { Button, Container } from "@material-ui/core"

const Neuron = (props: {
  neuron: NeuronType
  expanded: boolean
  handleExpand: Function
  handleDelete: Function
  globalParameters: GlobalParameters
}) => {
  const neuronName = "Neuron " + (props.neuron.index + 1)
  const [data, setData] = useState([])

  const [resultData, setResultData] = useState<ResultData>({
    stake: props.neuron.params.stakeSize,
    reward: null,
    stakePeriod: props.neuron.params.lockupPeriod,
  })

  const calculate = (calcParams: CalculatorParameters) => {
    const data = createDataPoints(calcParams, props.globalParameters)
    setData(data)
    setResultData({
      stake: calcParams.stakeSize,
      reward: data.slice(-1)[0]?.y.toFixed(2),
      stakePeriod: calcParams.lockupPeriod,
    })
  }

  return (
    <Accordion
      expanded={props.expanded}
      onChange={props.handleExpand(props.neuron.id)}
      square={false}
      className="mt-4 mb-4"
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} className="flex">
        <div>{neuronName}</div>
        <div className="flex-1 text-right text-gray-500">
          {resultData.reward ? "~" + resultData.reward + " ICP" : ""}{" "}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Container className="flex flex-col space-y-4">
          <InputFields
            calcParams={props.neuron.params}
            calculate={calculate}
            globalParameters={props.globalParameters}
          />
          <CalculationOutcome resultData={resultData} neuronName={neuronName} />
          <Container className="w-full h-96">
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
