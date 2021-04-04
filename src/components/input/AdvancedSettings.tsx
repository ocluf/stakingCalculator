import Collapse from "@material-ui/core/Collapse"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../redux/hooks"
import { changeGlobalParameters } from "../../redux/store"
import PercentageSlider from "./PercentageSlider"

const AdvancedSettings = () => {
  const [open, setOpen] = useState(true)
  const globalParameters = useAppSelector(state => state.globalParameters)
  const dispatch = useDispatch()

  return (
    <div className="bg-white max-w-lg m-5 rounded-lg shadow-lg">
      <div className="bg-white rounded-lg flex w-full p-4" onClick={() => setOpen(!open)}>
        Advanced settings
        <div className="ml-auto">{open ? <ExpandLess /> : <ExpandMore />}</div>
      </div>
      <Collapse in={open} timeout="auto">
        <div className="flex flex-col w-full space-y-4 p-4 px-8">
          {" "}
          <PercentageSlider
            title="Percentage locked inside voting neurons:"
            percentage={globalParameters.stakedPerc}
            setPerc={(x: number) => dispatch(changeGlobalParameters({ ...globalParameters, stakedPerc: x }))}
            postfix="%"
            defaultValue={90}
            min={1}
            max={100}
            step={1}
          />
          <PercentageSlider
            title={"Percentage of proposals you vote on:"}
            percentage={globalParameters.votingPerc}
            setPerc={(x: number) => dispatch(changeGlobalParameters({ ...globalParameters, votingPerc: x }))}
            postfix={"%"}
            min={0}
            max={100}
            step={1}
            defaultValue={100}
          />
          <PercentageSlider
            title={"Average neuron age:"}
            percentage={globalParameters.averageMaturityLevel}
            setPerc={(x: number) => dispatch(changeGlobalParameters({ ...globalParameters, averageMaturityLevel: x }))}
            postfix={globalParameters.averageMaturityLevel > 1 ? " years" : " year"}
            min={0}
            max={4}
            step={0.1}
            defaultValue={5}
          />
          <PercentageSlider
            title={"Average dissolve delay of all neurons:"}
            percentage={globalParameters.averageDissolveDelay}
            setPerc={(x: number) => dispatch(changeGlobalParameters({ ...globalParameters, averageDissolveDelay: x }))}
            postfix={globalParameters.averageDissolveDelay > 1 ? " years" : " year"}
            min={0.5}
            max={8}
            step={0.1}
            defaultValue={4}
          />
        </div>
      </Collapse>
    </div>
  )
}

export default AdvancedSettings
