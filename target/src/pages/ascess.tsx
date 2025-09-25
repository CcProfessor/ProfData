// /workspaces/ProfData/target/src/pages/ascess.tsx
import React from "react";
import { useTarget } from "../contexts/target.context";

import LoadingComponent from "../components/loading.component";
import AscessComponent from "../components/ascess.component";
import InvalidComponent from "../components/invalid.component";
import { AcessoSeguro } from "../components/header.component";
import { Rodape } from "../components/rodape.component";

import "./Login.css"; // usa o mesmo layout base para padding/flex

/**
 * Ascess page decides which component to show according to currentPage:
 *
 * 0: initial -> redirect to login (app routing)
 * 1: waiting/loading -> show LoadingComponent
 * 2: error -> show Invalid under login OR show loading + invalid
 * 3: code request -> show code request (not implemented here)
 * 4: access granted -> show AscessComponent
 * 5: request inside account -> show codeRequest as well (not implemented)
 *
 * We'll implement 1 (loading), 2 (invalid), 4 (ascess). CodeRequest placeholder not implemented.
 */

export default function AscessPage() {
  const { currentPage } = useTarget();

  let content;

  if (currentPage === 1) {
    content = (
      <div className="pageContent">
        <h1>Aguarde</h1>
        <LoadingComponent />
      </div>
    );
  } else if (currentPage === 2) {
    content = (
      <div className="pageContent">
        <h1>Erro</h1>
        <InvalidComponent type="login" />
      </div>
    );
  } else if (currentPage === 4) {
    content = (
      <div className="pageContent">
        <AscessComponent />
      </div>
    );
  } else {
    // fallback
    content = (
      <div className="pageContent">
        <h1>Carregando...</h1>
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="loginPageContainer">
      {/* Header */}
      <AcessoSeguro />

      {/* Main content */}
      <div className="loginPageMain">{content}</div>

      {/* Rodapé */}
      <Rodape />
    </div>
  );
}
