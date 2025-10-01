import React from "react";
import { usePlayerList } from "../contexts/admin.context"; // ajusta o path se estiver diferente

export default function PlayerList() {
  const { players, loading, fetchAllPlayers } = usePlayerList();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Players</h1>
      <button onClick={fetchAllPlayers} disabled={loading}>
        {loading ? "Carregando..." : "Recarregar"}
      </button>

      {loading && <p>Buscando players...</p>}

      {!loading && players.length === 0 && <p>Nenhum player encontrado.</p>}

      <ul>
        {players.map((p) => (
          <li key={p.id}>
            <strong>{p.username}</strong> (ID: {p.id}) - Access: {p.access}
          </li>
        ))}
      </ul>
    </div>
  );
}
