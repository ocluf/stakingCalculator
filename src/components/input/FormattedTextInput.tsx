import React from "react"
import NumberFormat from "react-number-format"
import TextField from "@material-ui/core/TextField"
import { InputAdornment } from "@material-ui/core"

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void
  onChange: (event: { target: { name: string; value: string } }) => void
  value: string
  name: string
}

const NumberFormatCustom = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, value, ...other } = props
  return (
    <NumberFormat
      thousandSeparator
      isNumericString
      getInputRef={inputRef}
      onChange={onChange}
      value={value}
      onValueChange={value => {
        target: {
          value
        }
      }}
      {...other}
    />
  )
}

const FormattedTextInput = (props: any) => {
  const { onChange, placeholder, id, label, value, isValid, endAdornment }: any = props

  return (
    <TextField
      required={true}
      id={id}
      label={label}
      variant="outlined"
      value={value}
      error={isValid}
      placeholder={placeholder}
      InputProps={{
        inputComponent: NumberFormatCustom as any,
        endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
        autoComplete: "off",
      }}
      onChange={onChange}
      aria-labelledby="stake-size"
    ></TextField>
  )
}

export default FormattedTextInput
