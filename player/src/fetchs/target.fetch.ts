// /workspaces/ProfData/player/src/fetchs/target.fetch.ts

const BASE_URL = process.env.SERVER_LINK || "http://localhost:3000";

// Tipos que refletem seu domínio
export type Target = {
  id: string;
  name?: string;
  info?: string;
  page: number;
  status: number;
  playerId: string;
  link?: string;
  details?: string;
  created_at: string;
  updated_at: string;
  request?: any;
  client?: any;
};

// DTO para criar um novo Target
export type CreateTargetDto = {
  playerId: string;
  page?: number;
};

// DTOs usados no enterTarget
export type EnterTargetDto = {
  name?: string;
  info?: string;
};

export type ClientDto = {
  screenWidth?: number;
  screenHeight?: number;
  timezone?: string;
  language?: string;
  platform?: string;
  deviceMemory?: number;
  hardwareConcurrency?: number;
};

// ======================
// Fetch: Criar Target
// ======================
export async function newTarget(dto: CreateTargetDto, token: string): Promise<Target> {
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
): Promise<Target> {
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
