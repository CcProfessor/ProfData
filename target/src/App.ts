// target/src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "../components/header.component";
import LoginPage from "./pages/login";
import AscessPage from "./pages/ascess";

/*
 * /login   -> página de login
 * /ascess  -> página de acesso (onde o cliente entra no flow)
 */
export default function App() {

  return (
    <BrowserRouter>
      <Header />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/login/:id" element={<LoginPage />} />
          <Route path="/ascess/:id" element={<AscessPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
