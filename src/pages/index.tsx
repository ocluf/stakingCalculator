import "../css/index.css"
import React from "react"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import App from "../components/App"

export default function Home() {
  return (
    <Provider store={store}>
      <App></App>
    </Provider>
  )
}
{
  /* <div>
<Banner />
<div className="flex flex-col p-3 space-y-4 max-w-lg mx-auto">
  <Neurons initialId={Math.random().toString()} />
</div>
</div> */
}
