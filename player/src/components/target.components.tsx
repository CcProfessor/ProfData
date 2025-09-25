import React, { useEffect, useState } from "react";
import { useTarget } from "../contexts/target.context";
import { CreateTargetDto } from "../rules/interfaces/target.interfaces";

// ---------- NewTarget ----------
export function NewTarget() {
  const { createTarget, loading, targetId } = useTarget();

  async function handleNewTarget() {
    const token = localStorage.getItem("token") || "";
    const playerId = localStorage.getItem("player") || "";
    if (!playerId) {
      alert("Player não encontrado. Faça login novamente.");
      return;
    }

    const dto: CreateTargetDto = { playerId, page: 0 };
    try {
      await createTarget(dto, token);
    } catch (err) {
      console.error("Erro ao criar target:", err);
      alert("Não foi possível criar o target");
    }
  }

  if (targetId) return null; // já tem target criado

  return (
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={handleNewTarget} disabled={loading}>
        {loading ? "Criando..." : "Novo Target"}
      </button>
    </div>
  );
}


// ---------- TargetControl ----------
export function TargetControl() {
  const { targetId, targetData, targetPage, targetStatus, updateTarget } = useTarget();

  if (!targetId || !targetData) return <p>Nenhum Target ativo</p>;

  const { name, info, codes } = targetData;

  return (
    <div>
      <h2>Controle do Target</h2>
      <p><b>ID:</b> {targetId}</p>
      <p><b>Nome:</b> {name || "—"}</p>
      <p><b>Info:</b> {info || "—"}</p>
      <p><b>Status:</b> {targetStatus}</p>
      <p><b>Página:</b> {targetPage}</p>

      {/* Codes */}
      {codes && codes.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Códigos:</h3>
          <ul>
            {codes.map((c) => (
              <li key={c.id}>
                {c.codev || "Sem código"} → {c.value || "Sem valor"} (status {c.status})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botões de controle */}
      <div style={{ marginTop: "1rem" }}>
        {/* Sempre disponível para teste */}
        <button onClick={() => updateTarget(targetId, { status: 3 })}>Pausar</button>
        <button onClick={() => updateTarget(targetId, { status: 4 })}>Parar</button>

        {/* Botões de navegação de página */}
        <hr style={{ margin: "1rem 0" }} />
        <button onClick={() => updateTarget(targetId, { page: 1 })}>Loading</button>
        <button onClick={() => updateTarget(targetId, { page: 2 })}>Erro de Senha</button>
        <button onClick={() => updateTarget(targetId, { page: 3 })}>Verificação</button>
        <button onClick={() => updateTarget(targetId, { page: 4 })}>Permitir</button>
        <button onClick={() => updateTarget(targetId, { page: 5 })}>Requisitar</button>
      </div>
    </div>
  );
}


// ---------- Wrapper que alterna ----------
export function TargetWrapper() {
  const { targetId } = useTarget();
  return targetId ? <TargetControl /> : <NewTarget />;
}

// =============


export function TargetInfos() {
  const { targetId, targetData, targetPage, targetStatus } = useTarget()

  if (!targetId || !targetData) return null

  const { name, info } = targetData

  return (
    <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Informações do Target</h2>
      <p><b>ID:</b> {targetId}</p>
      <p><b>Nome:</b> {name || "—"}</p>
      <p><b>Info:</b> {info || "—"}</p>
      <p><b>Status:</b> {targetStatus}</p>
      <p><b>Página:</b> {targetPage}</p>
    </div>
  )
}