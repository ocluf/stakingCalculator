import Collapse from "@material-ui/core/Collapse"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../redux/hooks"
import { changeGlobalParameters, standardGlobalParameters, toggleAdvanced } from "../../redux/store"
import { GlobalParameters } from "../../types"
import PercentageSlider from "./PercentageSlider"
import StateLessPercentageSlider from "./StateLessPercSlider"

const AdvancedSettings = () => {
  const show = useAppSelector(state => state.showAdvanced)
  const globalParameters = useAppSelector(state => state.globalParameters)
  const [newGlobalParameters, setNewGlobalParameters] = useState<GlobalParameters>({ ...globalParameters })
  const dispatch = useDispatch()
  // https://www.tailwindtoolbox.com/components/modal
  return (
    <>
      {show ? (
        <div className="modal z-40 fixed w-full h-full top-0 left-0 flex items-center justify-center">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            {/* <!-- Add margin if you want to see some of the overlay behind the modal--> */}
            <div className="modal-content py-4 text-left px-6">
              {/* <!--Title--> */}
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">Advanced settings</p>
                <div
                  className="modal-close cursor-pointer z-50"
                  onClick={() => {
                    dispatch(toggleAdvanced())
                    setNewGlobalParameters(globalParameters)
                  }}
                >
                  <svg
                    className="fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                  </svg>
                </div>
              </div>

              <div className="bg-white inset-0">
                <div className="bg-white rounded-lg flex w-full p-4"></div>
                <div className="flex flex-col w-full space-y-4 pb-4 px-4">
                  <StateLessPercentageSlider
                    title="% locked inside voting neurons"
                    value={newGlobalParameters.stakedPerc}
                    onChange={(x: number) => setNewGlobalParameters({ ...newGlobalParameters, stakedPerc: x })}
                    postfix="%"
                    defaultValue={90}
                    min={1}
                    max={100}
                    step={1}
                  />
                  <StateLessPercentageSlider
                    title={"% of proposals you vote on:"}
                    value={newGlobalParameters.votingPerc}
                    onChange={(x: number) => setNewGlobalParameters({ ...newGlobalParameters, votingPerc: x })}
                    postfix={"%"}
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={100}
                  />
                  <StateLessPercentageSlider
                    title={"Avg. neuron age"}
                    value={newGlobalParameters.averageMaturityLevel}
                    onChange={(x: number) =>
                      setNewGlobalParameters({ ...newGlobalParameters, averageMaturityLevel: x })
                    }
                    postfix={newGlobalParameters.averageMaturityLevel > 1 ? " years" : " year"}
                    min={0}
                    max={4}
                    step={0.1}
                    defaultValue={5}
                  />
                  <StateLessPercentageSlider
                    title={"Avg. dissolve delay of all neurons"}
                    value={newGlobalParameters.averageDissolveDelay}
                    onChange={(x: number) =>
                      setNewGlobalParameters({ ...newGlobalParameters, averageDissolveDelay: x })
                    }
                    postfix={newGlobalParameters.averageDissolveDelay > 1 ? " years" : " year"}
                    min={0.5}
                    max={8}
                    step={0.1}
                    defaultValue={4}
                  />
                </div>
              </div>

              {/* global action */}
              <div className="flex justify-around pt-2">
                <div
                  onClick={() => setNewGlobalParameters(standardGlobalParameters)}
                  className="px-4 bg-transparent p-3 rounded-lg text-delete hover:bg-gray-100 mr-2 cursor-pointer"
                >
                  RESET TO DEFAULTS
                </div>
                <div
                  onClick={() => {
                    dispatch(changeGlobalParameters(newGlobalParameters))
                    dispatch(toggleAdvanced())
                  }}
                  className="modal-close px-4 bg-transparent p-3 rounded-lg text-blue hover:bg-gray-100 cursor-pointer"
                >
                  APPLY
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default AdvancedSettings
