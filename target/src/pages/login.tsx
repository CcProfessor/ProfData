import React from "react";
import LoginComponent from "../components/login.component";
import InvalidComponent from "../components/invalid.component";
import { useTarget } from "../contexts/target.context";

export default function LoginPage() {
  const { currentPage } = useTarget();

  // exibimos invalid se currentPage for 2 (erro de senha) - conforme seu mapeamento
  const showInvalid = currentPage === 2;

  return (
    <div style={{ padding: 16 }}>
      <h1>Login</h1>
      <LoginComponent />
      {showInvalid && <InvalidComponent type="login" />}
    </div>
  );
}
