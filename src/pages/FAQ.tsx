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
    title: "What is the network nervous system?",
    content: (
      <div>
        The Network Nervous System (NNS) is the governance protocol that governs the Internet Computer network.
        Participants can earn rewards by staking their ICP tokens and voting on proposals that make improvements to the
        network. To learn more visit &nbsp;
        <a className="text-blue no-underline hover:underline" href="https://dfinity.org/faq">
          the official DFINITY site
        </a>
        .
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
        No, there are multiple unknown factors including the total number of tokens that will be staked, the average
        maturity level of the neurons, and the total supply of ICP. You can play around with these factors in the
        advanced settings.
      </div>
    ),
  },
  {
    title: "What is the stake size input field?",
    content: (
      <div>
        The stake size input field is the number of ICP that you lock into a neuron. The more you lock in the more
        voting power you have.
      </div>
    ),
  },
  {
    title: "What is the starting date input field?",
    content: (
      <div>
        The starting date input field is the date you lock your ICP in a neuron. The closer this date is to genesis the
        higher the reward you will initially receive.
      </div>
    ),
  },
  {
    title: "What is the staking period input field",
    content: (
      <div>
        This is the period for which you want to stake your ICP. It determines when you put your neuron into dissolving
        mode. For instance If you have a stake period of 3 years and a dissolve delay of 1 year then the calculator will
        start dissolving your neuron after 2 years making your total stake period 3 year.
      </div>
    ),
  },
  {
    title: "What is the dissolve delay input field?",
    content: (
      <div>
        {" "}
        The dissolve delay input field sets the dissolveDelay parameter of your neuron. This is the amount of time you
        have to wait before you can access your ICP again once you have triggerd the dissolving of your neuron.
      </div>
    ),
  },
  {
    title: "What does the % locked inside voting neurons advanced setting mean?",
    content: (
      <div>
        This is the percentage of the total supply of tokens on the network that are locked inside voting neurons. The
        more ICP locked inside neurons the less reward every neuron gets.
      </div>
    ),
  },
  {
    title: 'What does the "% of proposals you vote on" advanced setting mean?',
    content: (
      <div>
        This indicates what percentage of all proposals submitted to the Network Nervous System you vote on. This will
        impact your rewards in a linear way, meaning that if you vote on 90% of proposals you get 90% of your total
        possible reward. Note that a neuron can be configured to vote automatically by "following" other neurons.
      </div>
    ),
  },
  {
    title: 'What does the "Avg. neuron age" advanced setting mean?',
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
        be. The dissolve delay of a neuron determines how long its owner must wait after choosing to dissolve a neuron
        before the locked ICP tokens can be withdrawn. Neurons with a higher dissolve delay earn greater rewards. The
        dissolve delay of a neuron can be set up to a maximum of 8 years.
      </div>
    ),
  },
]

export default FAQ
