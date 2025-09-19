// /workspaces/ProfData/player/src/fetchs/target.fetch.ts

import { CreateTargetDto, EnterTargetDto, TargetResponse } from "../rules/interfaces/target.interfaces";
import { EnterTargetDto as ClientDto } from "../rules/interfaces/client.interface";

const BASE_URL = process.env.SERVER_LINK || "http://localhost:3000";

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
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    throw new Error(`Erro ao criar target: ${res.status}`);
  }

  return res.json();
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

  return res.json();
}
