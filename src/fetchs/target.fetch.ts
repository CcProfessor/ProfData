
import { CreateTargetDto, EnterTargetDto, TargetResponse } from "../rules/interfaces/target.interfaces";
import { EnterTargetDto as ClientDto } from "../rules/interfaces/client.interface";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

// ======================
// Fetch: Criar Target
// ======================
export async function newTarget(dto: CreateTargetDto, token: string): Promise<TargetResponse> {
  const res = await fetch(`${BASE_URL}/target/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto), // já está pronto (id + page)
  });

  if (!res.ok) {
    throw new Error(`Erro ao criar target: ${res.status}`);
  }

  return res.json(); // resposta já pode ir pro contexto
}

// ======================
// Fetch: Entrar em Target
// ======================
export async function enterTarget(
  id: string,
  dto: EnterTargetDto,
  secret: ClientDto,
  token: string
): Promise<TargetResponse> {
  console.log('Ta na função EnterTarget do player/src/fetchs/target.fetch.ts')
  const res = await fetch(`${BASE_URL}/target/access/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ dto, secret }),
  });

  if (!res.ok) {
    throw new Error(`Erro ao acessar target ${id}: ${res.status}`);
  }

  console.log('Resposta do enterTarget:', res);

  return res.json();
}

export async function getTargetById(id: string, token: string) {
  console.log('Ta na função getTargetById do player/src/fetchs/target.fetch.ts')
  const res = await fetch(`${BASE_URL}/target/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Erro ao buscar target ${id}: ${res.status}`);
  }

  return res.json();
}