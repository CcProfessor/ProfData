import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { PlayerProvider, PlayerListProvider } from "./contexts/players.context"
import { TargetProvider } from "./contexts/target.context"
import { CodesProvider } from "./contexts/codes.context"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlayerProvider>
        <PlayerListProvider>
          <TargetProvider>
            <CodesProvider>
              <App />
            </CodesProvider>
          </TargetProvider>
        </PlayerListProvider>
      </PlayerProvider>
    </BrowserRouter>
  </React.StrictMode>
)
