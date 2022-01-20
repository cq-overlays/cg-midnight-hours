import React from "react"
import ReactDOM from "react-dom"
import "./index.css"

const render = (App) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  )
}

export default render
