// server/src/applications/target/interfaces/target.interfaces.ts

// DTO para criar um novo Target
export class CreateTargetDto {
  playerId!: string;   // obrigatório
  page?: number;      // default 0
}

// DTO para atualizar name e info
export class EnterTargetDto {
  name!: string;
  info!: string;
}

// DTO para alterar status (1 ou 2)
export class InitStatusDto {
  success!: boolean; // true => 1, false => 2
}

// Interface de retorno
export interface TargetResponse {
  id: string;
  playerId: string;
  page: number;
  name?: string;
  info?: string;
  link?: string;
  details?: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}
