import { useEffect, useState } from "react";
import { useTarget } from "../contexts/target.context";
import { CreateTargetDto } from "../rules/interfaces/target.interfaces";

// ---------- NewTarget ----------
export function NewTarget() {
  const { createTarget, loading } = useTarget();

  async function handleNewTarget() {
    const token = localStorage.getItem("token") || "";
    const dto: CreateTargetDto = { playerId: "fake-player-id", page: 0 }; // TODO: pegar playerId real
    await createTarget(dto, token);
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={handleNewTarget} disabled={loading}>
        {loading ? "Criando..." : "Novo Target"}
      </button>
    </div>
  );
}

// ---------- TargetControl ----------
type WsMessage = {
  type: string;
  payload: any;
};

export function TargetControl() {
  const { target, updateTarget } = useTarget();
  const [messages, setMessages] = useState<WsMessage[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const fakeMessage: WsMessage = {
        type: "status",
        payload: { status: Math.random() > 0.5 ? 1 : 2 }, // agora numérico
      };
      setMessages((prev) => [...prev, fakeMessage]);

      if (target) {
        updateTarget(target.id, { status: fakeMessage.payload.status });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [target, updateTarget]);

  if (!target) return <p>Nenhum Target ativo</p>;

  return (
    <div>
      <h2>Controle do Target</h2>
      <p><b>ID:</b> {target.id}</p>
      <p><b>Nome:</b> {target.name}</p>
      <p><b>Status:</b> {target.status}</p>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => updateTarget(target.id, { status: 3 })}>
          Pausar
        </button>
        <button onClick={() => updateTarget(target.id, { status: 4 })}>
          Parar
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <h3>Logs recebidos:</h3>
        <ul>
          {messages.map((m, i) => (
            <li key={i}>
              {m.type}: {JSON.stringify(m.payload)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ---------- Wrapper que alterna ----------
export function TargetWrapper() {
  const { targetStatus } = useTarget();
  return targetStatus === 0 ? <NewTarget /> : <TargetControl />;
}
