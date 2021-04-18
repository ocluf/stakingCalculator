import React from "react"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { ArrowBackIos, ExpandLess, ExpandMore } from "@material-ui/icons"
import { navigate } from "gatsby-link"
import { useState } from "react"
import { Collapse } from "@material-ui/core"

const FAQBanner = () => {
  return (
    <div className="bg-white flex flex-row shadow-md">
      <ArrowBackIos className="m-6" onClick={() => navigate("/")} />
      <div className="font-semibold text-xl p-5 text-center">Frequently Asked Questions</div>
    </div>
  )
}

const FAQItem = (props: { title: string; content: JSX.Element }) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="bg-white max-w-lg lg:max-w-4xl m-5 lg:mx-auto rounded-lg shadow-lg">
      <div className="flex flex-row p-4 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="font-bold">{props.title}</div>
        <div className="ml-auto">{open ? <ExpandLess /> : <ExpandMore />}</div>
      </div>
      <Collapse in={open} timeout="auto">
        <div className="p-5">{props.content}</div>
      </Collapse>
    </div>
  )
}

const FAQ = () => {
  return (
    <div>
      <FAQBanner></FAQBanner>
      {faqItems.map(faqItem => {
        return <FAQItem title={faqItem.title} content={faqItem.content}></FAQItem>
      })}
    </div>
  )
}

const faqItems = [
  {
    title: "What is de network nervous system?",
    content: (
      <div>
        The Network Nervous System (NNS) is the governance protocol that governs the dfinity network. Participants can
        vote on proposals surrounding the dfinity network by staking the ICP token. To learn more visit &nbsp;
        <a className="text-blue no-underline hover:underline" href="https://dfinity.org/faq">
          the official dfinity site
        </a>
      </div>
    ),
  },
  {
    title: "What is a neuron?",
    content: (
      <div>
        A neuron represents a staked number of ICP which can vote on proposals. The more ICP staked the more voting
        reward you will receive and the more weight your votes have. A neuron can be configured to follow the votes of
        other neurons.
      </div>
    ),
  },
  {
    title: "Are the returns given by the staking calculator garantueed?",
    content: (
      <div>
        No, there are multiple unknown factors like: the total number of tokens that will be staked, the average
        maturity level of the neurons, and the total supply of ICP. You can play around with these factors in the
        advanced settings.
      </div>
    ),
  },
]

export default FAQ
