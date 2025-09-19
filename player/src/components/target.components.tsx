// /workspaces/ProfData/player/src/components/target.components.tsx
import { useEffect, useState } from "react";
import { useTarget } from "../contexts/target.context";

// ---------- NewTarget ----------
export function NewTarget() {
  const { createTarget, loading } = useTarget();

  async function handleNewTarget() {
    await createTarget("Novo Esquema");
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
    // TODO: trocar pelo WebSocket real
    const interval = setInterval(() => {
      const fakeMessage: WsMessage = {
        type: "status",
        payload: { status: Math.random() > 0.5 ? "running" : "idle" },
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
        <button onClick={() => updateTarget(target.id, { status: "paused" })}>
          Pausar
        </button>
        <button onClick={() => updateTarget(target.id, { status: "stopped" })}>
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
