import Collapse from "@material-ui/core/Collapse"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import React from "react"

const AdvancedSettings = (props: { children: React.ReactNode; open: boolean; handleExpand: Function }) => {
  return (
    <div>
      <div className="flex w-full" onClick={() => props.handleExpand()}>
        Advanced settings
        <div className="ml-2">{props.open ? <ExpandLess /> : <ExpandMore />}</div>
      </div>
      <Collapse in={props.open} timeout="auto" unmountOnExit className="mt-4">
        <div className="flex flex-col w-full space-y-4">{props.children}</div>
      </Collapse>
    </div>
  )
}

export default AdvancedSettings
