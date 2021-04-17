import React, { useEffect, useState } from "react"
import FormattedTextInput from "./FormattedTextInput"
import { changeExchangeRate } from "../../redux/store"
import { useDispatch } from "react-redux"

const StakeSizeInput = (props: { exchangeRate: number }) => {
  const [value, setValue] = useState<string>(props.exchangeRate.toString())
  const dispatch = useDispatch()
  const parsedExchangeRate = parseFloat(value.replace(/,/g, ""))
  const isValid = !isNaN(parsedExchangeRate) && parsedExchangeRate > 0

  // small delay to prevent recalculate on every number change
  useEffect(() => {
    const timeOutId = setTimeout(() => handleExchangeUpdate(), 500)
    return () => clearTimeout(timeOutId)
  }, [value])

  const handleExchangeUpdate = () => {
    if (isValid) {
      if (props.exchangeRate !== parsedExchangeRate) {
        dispatch(changeExchangeRate(parsedExchangeRate))
      }
    }
  }

  return (
    <FormattedTextInput
      id="Exchange_rate"
      label="exchange rate"
      variant="outlined"
      value={value}
      type="number"
      placeholder="The ICP to dollar exchangeRate"
      onChange={e => setValue(e.target.value)}
      isValid={!isValid}
      endAdornment={"$"}
    />
  )
}

export default StakeSizeInput
