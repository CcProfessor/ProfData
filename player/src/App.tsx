import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Data from './pages/data'
import Target from './pages/target'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<Data />} />
      <Route path="/target/:id" element={<Target />} />
    </Routes>
  )
}

export default App
