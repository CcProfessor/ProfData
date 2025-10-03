import React from "react";
import { useTarget } from "../contexts/target.context";

export default function AscessComponent() {
  const { targetData, currentPage, targetId } = useTarget();

  return (
    <div>
      <h2>Bem-vindo</h2>
      <p>Target ID: {targetId}</p>
      <p>Nome: {targetData?.name || "—"}</p>
      <p>Info: {targetData?.info || "—"}</p>
      <p>Página atual: {currentPage}</p>
      <div style={{ marginTop: 12 }}>
        <small>Esta é a tela de acesso — o conteúdo será controlado pelo Operador (Player).</small>
      </div>
    </div>
  );
}
