import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoginComponent from "../components/login.component";
import InvalidComponent from "../components/invalid.component";
import { useTarget } from "../contexts/target.context";

export default function LoginPage() {
  const { currentPage, setTargetId } = useTarget();
  const { id } = useParams<{ id: string }>(); // pega o :id da URL

  // 🔹 Atualiza targetId no contexto e no localStorage
  useEffect(() => {
    if (id) {
      setTargetId(id);
      localStorage.setItem("targetId", id);
    }
  }, [id, setTargetId]);

  // exibimos invalid se currentPage for 2 (erro de senha)
  const showInvalid = currentPage === 2;

  return (
    <div style={{ padding: 16 }}>
      <h1>Login</h1>
      <LoginComponent />
      {showInvalid && <InvalidComponent type="login" />}
    </div>
  );
}
