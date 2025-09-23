import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { PlayerProvider, PlayerListProvider } from './contexts/players.context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlayerProvider>
        <PlayerListProvider>
          <App />
        </PlayerListProvider>
      </PlayerProvider>
    </BrowserRouter>
  </React.StrictMode>
)
