// target/src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/header.component";
import LoginPage from "./pages/login";
import AscessPage from "./pages/ascess";

/**
 * Roteamento principal do app Target (cliente)
 *
 * /        -> redireciona para /login ou /ascess dependendo do token
 * /login   -> página de login
 * /ascess  -> página de acesso (onde o cliente entra no flow)
 */
export default function App() {
  // Checagem simples: se houver token em localStorage consideramos "autenticado".
  // Se você tem outro método (cookie, validação de sessão, etc.), troque essa lógica.
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const initialRoute = token ? "/ascess" : "/login";

  return (
    <BrowserRouter>
      <Header />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Navigate to={initialRoute} replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/ascess" element={<AscessPage />} />
          {/* fallback: manda para raiz que já redireciona corretamente */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
