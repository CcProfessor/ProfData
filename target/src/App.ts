import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login";
import AscessPage from "./pages/ascess";

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
