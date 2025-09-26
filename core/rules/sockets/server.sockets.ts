import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  PlayerSocketEvents,
  TargetSocketEvents,
  GatewayClientEvents,
  GatewayServerEvents,
  EnterTargetDto,
  PageUpdateDto,
  CodeResponseDto,
  SendResponseDto,
  Letter,
} from '../interfaces/gateway.interface';

@WebSocketGateway({ cors: true })
export class PlayerGateway {
  @WebSocketServer()
  server!: Server;

  // 🔹 Emite atualização de player
  notifyPlayerUpdate(playerId: string, data: any) {
    const letter: Letter = { Remetente: 0, Destino: 1, Middle: false };
    this.server.to(playerId).emit(PlayerSocketEvents.PlayerUpdate, { data, letter });
  }

  // 🔹 Recebe inscrição do player
  @SubscribeMessage(GatewayClientEvents.SubscribePlayer)
  handleSubscribe(@MessageBody() playerId: string, @ConnectedSocket() client: Socket) {
    client.join(playerId);
    const letter: Letter = { Remetente: 1, Destino: 0, Middle: false };
    return { event: 'subscribed', playerId, letter };
  }
}


@WebSocketGateway({ cors: true })
export class TargetGateway {
  @WebSocketServer()
  server!: Server;

  // 🔹 Recebe join do target
  @SubscribeMessage(GatewayClientEvents.EnterTarget)
  handleEnterTarget(@MessageBody() targetId: string, @ConnectedSocket() client: Socket) {
    client.join(targetId);
    const letter: Letter = { Remetente: 1, Destino: 0, Middle: false };
    console.log(`Target ${targetId} entrou, client ${client.id}`);
    return { targetId, letter };
  }

  // 🔹 Emite evento para player quando target entra
  notifyTargetEntered(targetId: string, data: EnterTargetDto) {
    const letter: Letter = { Remetente: 0, Destino: 1, Middle: false };
    this.server.to(targetId).emit(TargetSocketEvents.EnterTarget, { ...data, letter });
  }

  // 🔹 Emite atualização de página
  notifyPageUpdated(targetId: string, page: number, status?: number) {
    const letter: Letter = { Remetente: 0, Destino: 1, Middle: false };
    const payload: PageUpdateDto = { targetId, page, status };
    this.server.to(targetId).emit(TargetSocketEvents.UpdatePage, { ...payload, letter });
  }

  // 🔹 Emite atualização rápida de página
  notifyFastPageUpdate(targetId: string, page: number, status?: number) {
    const letter: Letter = { Remetente: 0, Destino: 1, Middle: false };
    const payload: PageUpdateDto = { targetId, page, status };
    this.server.to(targetId).emit(TargetSocketEvents.FastPageUpdate, { ...payload, letter });
  }

  // 🔹 Emite resposta de código
  notifyCodeResponse(targetId: string, codeId: string, codev: string) {
    const letter: Letter = { Remetente: 0, Destino: 1, Middle: false };
    const payload: CodeResponseDto = { targetId, codeId, codev };
    this.server.to(targetId).emit(TargetSocketEvents.CodeResponse, { ...payload, letter });
  }

  // 🔹 Envia respostas aleatórias
  notifySendResponse(targetId: string, manyInfos: object) {
    const letter: Letter = { Remetente: 0, Destino: 1, Middle: false };
    const payload: SendResponseDto = { targetId, manyInfos };
    this.server.to(targetId).emit(TargetSocketEvents.SendResponse, { ...payload, letter });
  }
}