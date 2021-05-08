import { TableRow } from "@material-ui/core"
import Checkbox from "@material-ui/core/Checkbox"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import Alert from "@material-ui/lab/Alert/Alert"
import Paper from "material-ui/Paper"

import React, { Fragment } from "react"
import { useDispatch } from "react-redux"
import {
  getHighestCheckedEndDate,
  getNrYearsFromNeurons,
  getTotalCheckedReturn,
  getTotalCheckedStake,
} from "../calcdatapoints"
import { useAppSelector } from "../redux/hooks"
import { toggleChecked, toggleGlobalChecked } from "../redux/store"
import Chart from "./Chart"

const GlobalCheckBox = (props: { allChecked: boolean; allUnchecked: boolean }) => {
  const dispatch = useDispatch()
  return (
    <div className="flex flex-row items-center space-x-2">
      <Checkbox
        checked={props.allChecked}
        indeterminate={!props.allChecked && !props.allUnchecked}
        onClick={() => dispatch(toggleGlobalChecked(!props.allChecked))}
        color="primary"
      />
      <div className="w-px h-full bg-checkboxGrey fon"></div>
    </div>
  )
}

const NeuronCheckbox = (props: { checked: boolean; index: number; neuronId: string }) => {
  const dispatch = useDispatch()
  return (
    <div className="flex flex-row items-center w-32 ml-2">
      <Checkbox checked={props.checked} color="primary" onChange={() => dispatch(toggleChecked(props.neuronId))} />
      <div>Neuron {props.index}</div>
    </div>
  )
}

const NeuronSelector = () => {
  const neurons = useAppSelector(state => state.neurons)
  const allChecked = neurons.filter(neuron => !neuron.checked).length === 0
  const allUnchecked = neurons.filter(neuron => neuron.checked).length === 0
  return (
    <div className="flex flex-row">
      <GlobalCheckBox allChecked={allChecked} allUnchecked={allUnchecked}></GlobalCheckBox>
      <div className="flex flex-row flex-wrap">
        {neurons.map((neuron, index) => (
          <NeuronCheckbox key={neuron.id} checked={neuron.checked} index={index + 1} neuronId={neuron.id} />
        ))}
      </div>
    </div>
  )
}

const ReturnStatistic = (props: { title: string; main: string; bottom: string; className?: string }) => {
  return (
    <div className={props.className}>
      <div className="text-sm">{props.title}</div>
      <div className="text-4xl font-bold">{props.main}</div>
      <div className="text-lightGrey text-xs opacity-40">{props.bottom}</div>
    </div>
  )
}

const ReturnStatistics = () => {
  const neurons = useAppSelector(state => state.neurons)
  const exchangeRate = useAppSelector(state => state.exchangeRate)
  const totalStake = getTotalCheckedStake(neurons)
  const totalReturn = getTotalCheckedReturn(neurons)
  const nrOfYears = getNrYearsFromNeurons(neurons)
  const roi = (totalReturn / totalStake) * 100
  const roiString: string = isNaN(roi) ? "0%" : roi.toFixed(2) + "%"
  const roiBottomString: string = isNaN(roi) ? "or 0% annualized" : `or ${(roi / nrOfYears).toFixed(2)}% annualized`
  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-14 w-max my-4">
      <ReturnStatistic
        title="Assets locked"
        main={totalStake + " ICP"}
        bottom={"$" + (totalStake * exchangeRate).toFixed(2)}
      />
      <ReturnStatistic
        title="Total Period"
        main={(isFinite(nrOfYears) ? nrOfYears : "0") + " yr."}
        bottom={
          "ending: " + (isFinite(nrOfYears) ? new Date(getHighestCheckedEndDate(neurons)).toLocaleDateString() : "N/A")
        }
        className="lg:hidden"
      />
      <ReturnStatistic
        title="Total Return"
        main={totalReturn.toFixed(2) + " ICP"}
        bottom={"$" + (totalReturn * exchangeRate).toFixed(2)}
      />
      <ReturnStatistic title="ROI" main={roiString} bottom={roiBottomString} />
    </div>
  )
}

const ReturnTable = (props: { stakeSize: number; startDate: Date; data: any }) => {
  return (
    <>
      {props.data.length > 0 ? (
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="center">Total ICP reward</TableCell>
                <TableCell align="right">ROI%</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map((data, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {/* {toRelativeDate(data.days).toDateString()} */}
                  </TableCell>
                  <TableCell align="center">{index === 0 ? 0 : data.y.toPrecision(3)}</TableCell>
                  <TableCell align="right">
                    {index === 0 ? 0 : ((data.y / props.stakeSize) * 100).toPrecision(3) + "%"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  )
}

const DashBoard = () => {
  return (
    <div className="lg:max-w-dashboard flex-1 mb-5">
      <div className="bg-white mt-5 mx-auto p-5 w-neuron lg:w-auto lg:ml-0 lg:mr-5 lg:max-w-dashboard shadow-lg rounded-lg lg:block">
        <div className="font-medium text-lg mb-4"> Your stake over time</div>
        <NeuronSelector></NeuronSelector>
        <Chart />
        <ReturnStatistics />
        <Alert variant="outlined" severity="error">
          Actual returns may differ from these projections based on several unknown parameters, to learn more check out
          the FAQ.
        </Alert>
        <div className="mt-4 font-medium ">
          To learn more about staking and the Internet Computer{" "}
          <a className="text-blue" href="https://allthingsinternetcomputer.substack.com/">
            follow me on substack!
          </a>{" "}
        </div>
        {/* <a
          className="twitter-share-button"
          href="https://twitter.com/intent/tweet?text=Hello%20world"
          data-size="large"
        >
          Tweet
        </a>
        <a href="https://t.me/share/url?url={url}&text={text}">telegram</a> */}
      </div>
    </div>
  )
}

export default DashBoard
