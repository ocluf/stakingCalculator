import React from "react"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const FAQ = () => {
  return (
    <div className="p-5 m-auto max-w-xl justify-center mt-11">
      <div className="text-center text-4xl mb-5"> Frequently Asked Questions</div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <div className="font-semibold">What is the network nervous system?</div>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            The Network Nervous System (NNS) is the governance protocol that governs the dfinity network. Participants
            can vote on proposals surrounding the dfinity network by staking the ICP token. To learn more visit &nbsp;
            <a className="text-blue-500 no-underline hover:underline" href="https://dfinity.org/faq">
              the official dfinity site
            </a>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <div className="font-semibold">What is a neuron?</div>
        </AccordionSummary>
        <AccordionDetails>
          A neuron represents a staked number of ICP which can vote on proposals. The more ICP staked the more voting
          reward you will receive and the more weight your votes have. A neuron can be configured to follow the votes of
          other neurons.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
          <div className="font-semibold">Are the numbers given by the staking calculator garantueed? </div>
        </AccordionSummary>
        <AccordionDetails>
          No, there are multiple unknown factors like: the total number of tokens that will be staked, the average
          maturity level of the neurons, and the total supply of ICP. You can play around with these factors in the
          advanced settings.
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default FAQ
