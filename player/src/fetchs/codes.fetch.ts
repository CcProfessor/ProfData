const BASE_URL = import.meta.env.VITE_SERVER_URL;

// ----------- Fetchs para Codes -----------
import {
  CreateCodeDto,
  UpdateCodevDto,
  CheckCodeDto,
  UpdateCodeValueDto,
  CodeResponse,
} from "../rules/interfaces/codes.interface";

// Criar novo Code para um Target
export async function newCodeRequest(targetId: string, token: string): Promise<CodeResponse> {
  console.log("Fetch: Criar novo code para target", targetId);
  const res = await fetch(`${BASE_URL}/codes/newcode/${targetId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Response do novo code: ", res);

  if (!res.ok) throw new Error(`Erro ao criar novo code: ${res.status}`);
  return res.json();
}

// Inserir código (codev)
export async function enterCode(codeId: string, dto: UpdateCodevDto, token: string): Promise<CodeResponse> {
  console.log("Fetch: Inserir codev para code", codeId, dto);
  const res = await fetch(`${BASE_URL}/codes/entercode/${codeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });

  console.log("Response do enter code: ", res);

  if (!res.ok) throw new Error(`Erro ao inserir codev: ${res.status}`);
  return res.json();
}

// Validar código (check)
export async function checkCode(codeId: string, dto: CheckCodeDto, token: string): Promise<CodeResponse> {
  const res = await fetch(`${BASE_URL}/codes/checkcode/${codeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) throw new Error(`Erro ao validar code: ${res.status}`);
  return res.json();
}

// Atribuir valor ao code
export async function valueCode(codeId: string, dto: UpdateCodeValueDto, token: string): Promise<CodeResponse> {
  const res = await fetch(`${BASE_URL}/codes/valuecode/${codeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) throw new Error(`Erro ao atribuir valor: ${res.status}`);
  return res.json();
}

// Buscar todos
export async function getAllCodes(token: string): Promise<CodeResponse[]> {
  const res = await fetch(`${BASE_URL}/codes/findall`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`Erro ao buscar todos os codes: ${res.status}`);
  return res.json();
}

// Buscar 1 por ID
export async function getCodeById(id: string, token: string): Promise<CodeResponse> {
  const res = await fetch(`${BASE_URL}/codes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`Erro ao buscar code ${id}: ${res.status}`);
  return res.json();
}

// Buscar codes por lista de targets
export async function getCodesByTargets(targetIds: string[], token: string): Promise<string[][]> {
  const res = await fetch(`${BASE_URL}/codes/codes-by-targets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ targetIds }),
  });

  if (!res.ok) throw new Error(`Erro ao buscar codes por targets: ${res.status}`);
  return res.json();
}
