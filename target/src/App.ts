import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/login";
import AscessPage from "./pages/ascess";

export default function App() {
  return (
        <Routes>
          <Route path="/login/:id" element={<LoginPage />} />
          <Route path="/ascess/:id" element={<AscessPage />} />
        </Routes>
  );
}
