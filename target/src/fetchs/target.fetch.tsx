import { useTarget } from "../contexts/target.context";
import { EnterTargetDto as TargetEnterDto, InitStatusDto, TargetResponse } from "../rules/interfaces/target.interfaces";
import { EnterTargetDto as ClientDto } from "../rules/interfaces/client.interface";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

// Request body para enterTarget
export interface EnterTargetBody {
  dto: TargetEnterDto;
  secret: ClientDto;
}

// 🔹 PATCH /target/access/:id
export async function enterTargetAPI(targetId: string, body: EnterTargetBody): Promise<TargetResponse> {
  const res = await fetch(`${BASE_URL}/target/access/${targetId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`enterTarget failed: ${res.statusText}`);
  return await res.json();
}

// 🔹 PATCH /target/init/:id
export async function initStatusAPI(targetId: string, dto: InitStatusDto): Promise<TargetResponse> {
  const res = await fetch(`${BASE_URL}/target/init/${targetId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });

  if (!res.ok) throw new Error(`initStatus failed: ${res.statusText}`);
  return await res.json();
}

// 🔹 PATCH /target/targetPage/:id
export async function updatePageAPI(targetId: string, page: number): Promise<TargetResponse> {
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
  const { targetId, socket, setTargetData, setCurrentPage, setLastPage } = useTarget();

  const enterTarget = async (body: EnterTargetBody) => {
    if (!targetId) throw new Error("No targetId set");

    // 🔹 Chama o backend e espera JSON
    const resp = await enterTargetAPI(targetId, body);

    // 🔹 Atualiza localmente com os dados retornados
    setTargetData(resp);

    // 🔹 Emite evento via socket para outros clientes
    socket?.emit("targetEntered", { targetId, ...body.dto });

    return resp;
  };

  const initStatus = async (dto: InitStatusDto) => {
    if (!targetId) throw new Error("No targetId set");

    const resp = await initStatusAPI(targetId, dto);

    // 🔹 Atualiza status localmente
    if (resp?.status !== undefined) {
      setTargetData(prev => prev ? { ...prev, status: resp.status } : prev);
    } else if (dto?.success !== undefined) {
      setTargetData(prev => prev ? { ...prev, status: dto.success ? 1 : 2 } : prev);
    }

    // 🔹 Emite evento via socket
    socket?.emit("targetStatusInit", { targetId, ...dto });

    return resp;
  };

  const updatePage = async (page: number) => {
    if (!targetId) throw new Error("No targetId set");

    const resp = await updatePageAPI(targetId, page);

    // 🔹 Atualiza localmente página
    setLastPage(prev => prev ?? page);
    setCurrentPage(page);

    // 🔹 Emite evento via socket
    socket?.emit("targetPageUpdated", { targetId, page });

    return resp;
  };

  return { enterTarget, initStatus, updatePage };
}
