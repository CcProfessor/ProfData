import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/login";
import AscessPage from "./pages/ascess";
import HomePage from "./pages/home";

/*
 * /login   -> página de login
 * /ascess  -> página de acesso (onde o cliente entra no flow)
 */
export default function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login/:id" element={<LoginPage />} />
      <Route path="/ascess/:id" element={<AscessPage />} />
    </Routes>
  );
}
