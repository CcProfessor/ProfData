// LoginComponent.tsx
import React, { useState } from "react";
import { useTarget } from "../contexts/target.context";
import "../styles/Login.css";
import loginIMG from "../imagens/LoginIMG.jpg";

export default function LoginComponent() {
  const { setCurrentPage, setTargetPage, setTargetStatus, targetData, setTargetData } = useTarget();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function doLoginFetch(u: string, p: string) {
    if (u === "admin" && p === "123") {
      return { success: true };
    }
    return { success: false, message: "Usuário ou senha inválidos." };
  }

  async function handleLogin(e?: React.FormEvent) {
    e?.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await doLoginFetch(username, password);

      if (!res.success) {
        setError(res.message || "Falha no login");
        return;
      }

      setCurrentPage(1);
      setTargetPage(1);
      setTargetStatus(1);

      if (targetData) {
        setTargetData({ ...targetData, info: `logged:${username}` });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="boxLogin" className="login-container">
      {/* Imagem no topo */}
      <div className="login-header">
        <img src={loginIMG} alt="Login Banner" className="login-img" />
      </div>

      {/* Exibição de erro */}
      {error && (
        <div id="msgErroBoxLogin" className="txtErro">
          <strong>{error}</strong>
        </div>
      )}

      {/* Formulário */}
      <form onSubmit={handleLogin} className="login-box">
        <p className="mb10 aviso">
          <b>Insira o usuário e a senha</b>
        </p>

        <div className="input-group">
          <label htmlFor="usuario">Usuário</label>
          <input
            id="usuario"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>

        <button type="submit" className="btn-login" disabled={submitting}>
          {submitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
