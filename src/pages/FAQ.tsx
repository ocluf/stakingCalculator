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
    title: "Are the returns given by the staking calculator guaranteed?",
    content: (
      <div>
        No, there are multiple unknown factors like: the total number of tokens that will be staked, the average
        maturity level of the neurons, and the total supply of ICP. You can play around with these factors in the
        advanced settings.
      </div>
    ),
  },
  {
    title: "What is the stake size input field?",
    content: (
      <div>
        The stake size input fields is the number of ICP that you lock into a neuron. The more you lock in the more
        voting power you have.
      </div>
    ),
  },
  {
    title: "What is the starting date input field?",
    content: (
      <div>
        The starting date input field is the date you lock your ICP in a neuron. The closer this date is to
        genesis the higher the reward you will initially receive.
      </div>
    ),
  },
  {
    title: "What is the staking period input field",
    content: (
      <div>
        The staking period is the total amount of time you want to lock your tokens. During this time you can't get them
        back. The dissolve delay is automatically set the the highest value possible, meaning that for any staking period
        above 8 years the dissolve delay will be 8 and for lower staking periods the dissolve delay will be the same as
        the staking period.
      </div>
    ),
  },
  {
    title: "What does the % locked inside voting neurons advanced setting mean?",
    content: <div>This is the percentage of the total supply of tokens that is locked inside voting neurons.</div>,
  },
  {
    title: "What does the % locked inside voting neurons advanced setting mean?",
    content: <div>This is the percentage of the total supply of tokens that is locked inside voting neurons.</div>,
  },
  {
    title: "What does the % of proposals you vote on advanced setting mean?",
    content: (
      <div>
        This indicates what percentage of the proposals submitted to the Network Nervous System you vote on. This will impact your 
        rewards in a linear way, meaning that if you vote on 90% of proposals you get 90% of your total possible reward.
      </div>
    ),
  },
  {
    title: "What does the Avg. neuron age advanced setting mean?",
    content: (
      <div>
        This indicates what you think the average age of all the neurons on the Network Nervous System will be. The age
        of a neuron is determined by how long it exists and whether it has triggered its dissolve delay yet. If the
        average neuron age is higher then your own neurons you will get relatively less rewards and if your neuron has a
        higher age you will earn more.
      </div>
    ),
  },
  {
    title: "What does the Avg. dissolve delay advanced setting mean?",
    content: (
      <div>
        This indicates what you think the average dissolve delay of all the neurons on the Network Nervous System will
        start dissolving your neuron. Neurons with a higher dissolve delay will earn more rewards.
      </div>
    ),
  },
]

export default FAQ
