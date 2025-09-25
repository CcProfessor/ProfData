import React, { useState } from "react";
import { useTarget } from "../contexts/target.context";

// Mudar em breve para a nova estrutura

export default function LoginComponent() {
  const { setCurrentPage, setTargetPage, setTargetStatus, targetData, setTargetData } = useTarget();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // placeholder fetch ready (not used automatically)
  async function doLoginFetch(u: string, p: string) {
    // exemplo: await fetch(`${BASE_URL}/target/login`, {...})
    // aqui só retorno um mock com sucesso
    return { success: true };
  }

  async function handleLogin(e?: React.FormEvent) {
    e?.preventDefault();
    setSubmitting(true);
    try {
      // se você tiver fetch real, chama aqui:
      // const res = await doLoginFetch(username, password);
      // Por enquanto simulamos sucesso e mudamos a página para 1 (loading)
      // Atualiza instância local também
      setCurrentPage(1);
      setTargetPage(1);

      // opcional: set status to some intermediate value
      setTargetStatus(1);

      // atualiza targetData se existir
      if (targetData) {
        setTargetData({ ...targetData, info: `logged:${username}` });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 360 }}>
      <label>
        Usuário
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>

      <label>
        Senha
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>

      <div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </form>
  );
}
