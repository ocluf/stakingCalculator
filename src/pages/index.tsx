import "../css/index.css"
import React from "react"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import App from "../components/App"
import { createMuiTheme, ThemeProvider } from "@material-ui/core"

export default function Home() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#29ABE2",
      },
    },
  })
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App></App>
      </ThemeProvider>
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
