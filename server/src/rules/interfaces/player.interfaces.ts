// server/src/applications/player/interfaces/player.interfaces.ts

// DTOs
export class CreatePlayerDto {
  username!: string;
  password!: string;
}

export class UpdatePlayerDto {
  username?: string;
  password?: string;
}

// Interface para retorno (se quiser diferenciar do domínio)
export interface PlayerResponse {
  id: string;
  username: string;
  access: number;
  created_at: Date;
  updated_at: Date;
}

// Interface para persistência (com password incluso)
export interface PlayerPersistence {
  id: string;
  username: string;
  password: string;
  access: number;
  created_at: Date;
  updated_at: Date;
}