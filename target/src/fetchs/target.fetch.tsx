import { useTarget } from "../contexts/target.context";
import { InitStatusDto, TargetResponse, EnterTargetDto, EnterTargetIPDto } from "../rules/interfaces/target.interfaces";
import { EnterTargetDto as ClientDto } from "../rules/interfaces/client.interface";
import { CodePersistence, CodeResponse } from "../rules/interfaces/codes.interface";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

// Request body para enterTarget
export interface EnterTargetBody {
  dto: EnterTargetDto;
  secret: ClientDto;
}

// 🔹 GET /target/detail/:id
export async function detailTargetAPI(targetId: string): Promise<TargetResponse> {
  const res = await fetch(`${BASE_URL}/target/detail/${targetId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error(`detailTarget failed: ${res.statusText}`);
  return await res.json();
}

// 🔹 PATCH /target/access/:id
export async function enterTargetAPI(targetId: string, body: EnterTargetIPDto): Promise<TargetResponse> {
  console.log('Ta na função EnterTarget do target/src/fetchs/target.fetch.ts')
  console.log('targetId:', targetId);
  console.log('Body do enterTargetAPI:', body);
  console.log('Simplificação:', body.name, body.info);
  console.log('Rota: ', `${BASE_URL}/target/access/${targetId}`)

  const res = await fetch(`${BASE_URL}/target/access/${targetId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  console.log('Saiu do Fetch do enterTargetAPI');

  if (!res.ok) throw new Error(`enterTarget failed: ${res.statusText}`);

  console.log('Resposta do enterTargetAPI:', res);
  return await res.json();
}

// 🔹 PATCH /codes/entercode/:codeId
export async function enterCodeAPI(codeId: string, dto: CodePersistence): Promise<CodeResponse> {
  console.log('Entrou no Enter Code! Code:', codeId, 'DTO: ', dto);

  const res = await fetch(`${BASE_URL}/codes/entercode/${codeId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });

  console.log('Res: ', res);

  if (!res.ok) throw new Error(`enterCode failed: ${res.statusText}`);
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
    body: JSON.stringify({ page }),
  });
  if (!res.ok) throw new Error(`updatePage failed: ${res.statusText}`);
  return await res.json();
}

/**
 * Custom hook para usar dentro do TargetContext
 */
export function useTargetFetch() {
  const { targetId, socket, targetData, setTargetData, setCurrentPage, lastPage, setLastPage } = useTarget();

  const enterTarget = async (targetId: string, body: EnterTargetIPDto) => {
    if (!targetId) throw new Error("No targetId set");

    // 🔹 Chama o backend e espera JSON
    const resp = await enterTargetAPI(targetId, body);

    // 🔹 Atualiza localmente com os dados retornados
    setTargetData(resp);

    // 🔹 Emite evento via socket para outros clientes
    socket?.emit("targetEntered", { targetId, ...body });

    return resp;
  };

  const initStatus = async (dto: InitStatusDto) => {
  if (!targetId) throw new Error("No targetId set");

  const resp = await initStatusAPI(targetId, dto);

  if (resp?.status !== undefined) {
    // Atualiza diretamente com o retorno do backend
    setTargetData(resp);
  } else if (dto?.success !== undefined && targetData) {
    // Atualiza localmente, baseado no targetData atual
    setTargetData({ ...targetData, status: dto.success ? 1 : 2 });
  }

  // 🔹 Emite evento via socket
  socket?.emit("targetStatusInit", { targetId, ...dto });

  return resp;
};

  const updatePage = async (page: number) => {
    if (!targetId) throw new Error("No targetId set");

    const resp = await updatePageAPI(targetId, page);

    // 🔹 Atualiza localmente página
    setLastPage(lastPage ?? page);   // usa valor direto, não função
    setCurrentPage(page);

    // 🔹 Atualiza targetData localmente se existir
    if (targetData) {
      setTargetData({ ...targetData, page });
    }

    // 🔹 Emite evento via socket
    socket?.emit("targetPageUpdated", { targetId, page });

    return resp;
  };

  return { enterTarget, initStatus, updatePage };
}
