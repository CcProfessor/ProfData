import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, HashRouter } from "react-router-dom"
import App from "./App"
import { TargetProvider } from "./contexts/target.context"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <TargetProvider>
        <App />
      </TargetProvider>
    </HashRouter>
  </React.StrictMode>
)
