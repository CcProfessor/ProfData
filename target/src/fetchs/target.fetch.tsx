// /workspaces/ProfData/target/src/fetchs/target.fetch.tsx
import { useTarget } from "../contexts/target.context";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

// DTOs
export interface EnterTargetBody {
  dto: any; // EnterTargetDto
  secret: any; // ClientDto
}

export async function enterTargetAPI(targetId: string, body: EnterTargetBody) {
  const res = await fetch(`${BASE_URL}/target/access/${targetId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`enterTarget failed: ${res.statusText}`);
  return await res.json();
}

export async function initStatusAPI(targetId: string, dto: any) {
  const res = await fetch(`${BASE_URL}/target/init/${targetId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });

  if (!res.ok) throw new Error(`initStatus failed: ${res.statusText}`);
  return await res.json();
}

export async function updatePageAPI(targetId: string, page: number) {
  const res = await fetch(`${BASE_URL}/target/targetPage/${targetId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(page),
  });

  if (!res.ok) throw new Error(`updatePage failed: ${res.statusText}`);
  return await res.json();
}

/**
 * Custom hook para usar dentro do TargetContext
 */
export function useTargetFetch() {
  const { targetId, socket, setTargetData, setCurrentPage, setLastPage } =
    useTarget();

  const enterTarget = async (body: EnterTargetBody) => {
    if (!targetId) throw new Error("No targetId set");
    const resp = await enterTargetAPI(targetId, body);

    // Atualiza localmente o targetData
    setTargetData(resp);

    // Emite evento via socket
    socket?.emit("joinTarget", targetId);

    return resp;
  };

  const initStatus = async (dto: any) => {
    if (!targetId) throw new Error("No targetId set");
    const resp = await initStatusAPI(targetId, dto);

    // Opcional: atualizar status localmente se retornou success/status
    if (resp?.status !== undefined) {
      setTargetData((prev: any) => prev ? { ...prev, status: resp.status } : prev);
    } else if (resp?.success !== undefined) {
      setTargetData((prev: any) => prev ? { ...prev, status: resp.success ? 1 : 2 } : prev);
    }

    // Emite evento via socket (nome do evento pode ser diferente do backend)
    socket?.emit("targetStatusInit", { targetId, ...resp });

    return resp;
  };

  const updatePage = async (page: number) => {
    if (!targetId) throw new Error("No targetId set");
    const resp = await updatePageAPI(targetId, page);

    // Atualiza localmente página
    setLastPage((prev) => prev ?? page);
    setCurrentPage(page);

    // Emite evento via socket
    socket?.emit("targetPageUpdated", { targetId, page });

    return resp;
  };

  return { enterTarget, initStatus, updatePage };
}
