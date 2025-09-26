// Tipos básicos
export type TargetId = string;
export type PlayerId = string;
export type CodeId = string;
export type Status = number;
export type Page = number;
export type Codev = string;
export type ManyInfos = Record<string, any>;

// Eventos do servidor (emitidos para o front end)
export enum GatewayServerEvents {
  EnterTarget = 'enterTarget',
  UpdatePage = 'updatePage',
  FastPageUpdate = 'fastPageUpdate',
  CodeResponse = 'codeResponse',
  SendResponse = 'sendResponse',
  PlayerUpdate = 'playerUpdate',
}

// Eventos do cliente (emitidos pelo front end)
export enum GatewayClientEvents {
  SubscribePlayer = 'subscribePlayer',
  EnterTarget = 'joinTarget', // quando target entra
  UpdatePage = 'updatePage', // quando player muda página
}

export enum PlayerSocketEvents {
  EnterTarget = GatewayServerEvents.EnterTarget,
  FastPageUpdate = GatewayServerEvents.FastPageUpdate,
  UpdatePage = GatewayServerEvents.UpdatePage,
  CodeResponse = GatewayServerEvents.CodeResponse,
  SendResponse = GatewayServerEvents.SendResponse,
  SubscribePlayer = GatewayClientEvents.SubscribePlayer,
}

export enum TargetSocketEvents {
  EnterTarget = GatewayClientEvents.EnterTarget,
  UpdatePage = GatewayServerEvents.UpdatePage,
  FastPageUpdate = GatewayServerEvents.FastPageUpdate,
  CodeResponse = GatewayServerEvents.CodeResponse,
  SendResponse = GatewayServerEvents.SendResponse,
}

// Interfaces DTO (exemplos)
export interface EnterTargetDto {
  targetId: TargetId;
  name: string;
  info: string;
}

export interface PageUpdateDto {
  targetId: TargetId;
  status?: Status;
  page: Page;
}

export interface CodeResponseDto {
  targetId: TargetId;
  codeId: CodeId;
  codev: Codev;
}

export interface SendResponseDto {
  targetId: TargetId;
  manyInfos: ManyInfos;
}
