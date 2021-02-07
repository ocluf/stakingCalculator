import React from "react"
import NumberFormat from "react-number-format"
import PropTypes from "prop-types"
import TextField from "@material-ui/core/TextField"

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        })
      }}
      thousandSeparator
      suffix="%"
    />
  )
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

class FormattedInputs extends React.Component {
  state = {
    numberformat: "90",
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render() {
    const { numberformat } = this.state

    return (
      <TextField
        label="react-number-format"
        value={numberformat}
        onChange={this.handleChange("numberformat")}
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    )
  }
}

export default FormattedInputs
