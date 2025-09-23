import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Data from './pages/data'
import Target from './pages/target'
import React from 'react'
import PlayerList from './pages/playerList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/:id" element={<Data />} />
      <Route path="/target/:id" element={<Target />} />
      <Route path="/players" element={<PlayerList />} /> {/* 👉 nova rota */}
    </Routes>
  )
}

export default App
