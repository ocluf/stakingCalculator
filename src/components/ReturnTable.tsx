import React, { Fragment, useState } from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { Datapoint } from "../types/types"
import { Star } from "@material-ui/icons"

const ReturnTable = (props: { stakeSize: number; startDate: Date; data: any }) => {
  const toRelativeDate = (nrOfDays: number): Date => {
    const dateUTC: number = props.startDate.getTime() + nrOfDays * 86400000
    return new Date(dateUTC)
  }

  return (
    <Fragment>
      {props.data.length > 0 ? (
        <TableContainer component={Paper}>
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
                    {toRelativeDate(data.days).toDateString()}
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
    </Fragment>
  )
}

export default ReturnTable
