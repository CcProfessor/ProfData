// src/components/NewTarget.tsx
import { useTarget } from "../context/TargetContext";

function NewTarget() {
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

export default NewTarget;
