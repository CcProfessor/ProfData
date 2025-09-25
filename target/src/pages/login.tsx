import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useTarget } from "../contexts/target.context";
import LoginComponent from "../components/login.component";
import InvalidComponent from "../components/invalid.component";
import { AcessoSeguro } from "../components/header.component";
import { DicaCadeado } from "../components/side.component";
import { Rodape } from "../components/rodape.component";

import "../styles/Login.css"; // para o layout de colunas

export default function LoginPage() {
  const { currentPage, setTargetId, targetData } = useTarget();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      setTargetId(id);
      localStorage.setItem("targetId", id);
    }
  }, [id, setTargetId]);

  const showInvalid = currentPage === 2;

  return (
    <div className="loginPageContainer">
      {/* Header */}
      <AcessoSeguro />

      {/* Main content em duas colunas */}
      <div className="loginPageMain">
        {/* Coluna esquerda: login */}
        <div className="loginColumn">
          <LoginComponent />
          {showInvalid && <InvalidComponent type="login" />}
        </div>

        {/* Coluna direita: dica de segurança */}
        <div className="dicaColumn">
          <DicaCadeado />
        </div>
      </div>

      {/* Rodapé */}
      <Rodape />
    </div>
  );
}
