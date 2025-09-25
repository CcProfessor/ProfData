
import { CreateTargetDto, EnterTargetDto, TargetResponse } from "../rules/interfaces/target.interfaces";
import { EnterTargetDto as ClientDto } from "../rules/interfaces/client.interface";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

// ======================
// Fetch: Criar Target
// ======================
export async function newTarget(dto: CreateTargetDto, token: string): Promise<TargetResponse> {
  console.log('fetch dto: ', dto);
  console.log('token: ', token);
  const playerInfo = JSON.parse(dto.playerId);
  console.log('playerInfo: ', playerInfo);
  // if (!playerInfo || !playerInfo.playerId) {
  //   throw new Error("playerId inválido no DTO");
  // }
  console.log('playerInfo.id: ', playerInfo.playerId);
  const newDto = {
    playerId: playerInfo.id,
    page: dto.page,
  }
  const res = await fetch(`${BASE_URL}/target/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newDto),
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

export async function getTargetById(id: string, token: string) {
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