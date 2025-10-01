import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Data from './pages/data'
import Target from './pages/target'
import PlayerList from './pages/playerList'

import { PlayerProvider } from "./contexts/players.context"
import { PlayerListProvider } from "./contexts/admin.context"
import { TargetProvider } from "./contexts/target.context"
import { CodesProvider } from "./contexts/codes.context"

function App() {
  return (
    <Routes>
      
      {/* Redirecionar "/" para "/login" */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Login só precisa de Player */}
      <Route
        path="/login"
        element={
          <PlayerProvider>
            <Login />
          </PlayerProvider>
        }
      />

      {/* Data precisa de Player + Target */}
      <Route
        path="/user/:id"
        element={
          <PlayerProvider>
            <TargetProvider>
              <Data />
            </TargetProvider>
          </PlayerProvider>
        }
      />

      {/* Player List só precisa de PlayerList */}
      <Route
        path="/secret/players/list"
        element={
          <PlayerListProvider>
            <PlayerList />
          </PlayerListProvider>
        }
      />

      {/* Target precisa de Target + Codes */}
      <Route
        path="/target/:id"
        element={
          <PlayerListProvider>
            <TargetProvider>
              <CodesProvider>
                <Target />
              </CodesProvider>
            </TargetProvider>
          </PlayerListProvider>
        }
      />
    </Routes>
  )
}


export default App
