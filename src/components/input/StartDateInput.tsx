import DateFnsUtils from "@date-io/date-fns"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { changeStartDate } from "../../redux/store"
import React, { useState } from "react"
import { useDispatch } from "react-redux"

const StartDateInput = (props: { neuronId: string; startDate: number }) => {
  const [startDate, setStartDate] = useState(new Date(props.startDate))
  const dispatch = useDispatch()

  const isValidDate = date => {
    return date instanceof Date && !isNaN(date as any)
  }

  const handleDateChange = (date: Date) => {
    if (isValidDate(date)) {
      setStartDate(date)
      dispatch(changeStartDate({ id: props.neuronId, number: date.getTime() }))
    } else {
      setStartDate(date)
    }
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Starting date"
        value={startDate}
        onChange={(date, value) => handleDateChange(date)}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default StartDateInput
