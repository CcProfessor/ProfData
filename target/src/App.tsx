import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/login";
import AscessPage from "./pages/ascess";

/*
 * /login   -> página de login
 * /ascess  -> página de acesso (onde o cliente entra no flow)
 */
export default function App() {

  return (
    <BrowserRouter>
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/login/:id" element={<LoginPage />} />
          <Route path="/ascess/:id" element={<AscessPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
