import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GatewayServerEvents, GatewayClientEvents } from '../interfaces/gateway.interface';

@WebSocketGateway({ cors: true })
export class PlayerGateway {
  @WebSocketServer()
  server!: Server;

  // 🔹 Emite atualização de player
  notifyPlayerUpdate(playerId: string, data: any) {
    this.server.to(playerId).emit(GatewayServerEvents.PlayerUpdate, data);
  }

  // 🔹 Recebe inscrição do player
  @SubscribeMessage(GatewayClientEvents.SubscribePlayer)
  handleSubscribe(@MessageBody() playerId: string, @ConnectedSocket() client: Socket) {
    client.join(playerId);
    return { event: 'subscribed', playerId };
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
    console.log(`Target ${targetId} entrou, client ${client.id}`);
  }

  // 🔹 Emite evento para player quando target entra
  notifyTargetEntered(targetId: string, data: { name: string; info: string }) {
    this.server.to(targetId).emit(GatewayServerEvents.EnterTarget, { targetId, ...data });
  }

  // 🔹 Emite atualização de página
  notifyPageUpdated(targetId: string, page: number, status?: number) {
    this.server.to(targetId).emit(GatewayServerEvents.UpdatePage, { targetId, page, status });
  }

  // 🔹 Emite atualização rápida de página
  notifyFastPageUpdate(targetId: string, page: number, status?: number) {
    this.server.to(targetId).emit(GatewayServerEvents.FastPageUpdate, { targetId, page, status });
  }

  // 🔹 Emite resposta de código
  notifyCodeResponse(targetId: string, codeId: string, codev: string) {
    this.server.to(targetId).emit(GatewayServerEvents.CodeResponse, { targetId, codeId, codev });
  }

  // 🔹 Envia respostas aleatórias
  notifySendResponse(targetId: string, manyInfos: object) {
    this.server.to(targetId).emit(GatewayServerEvents.SendResponse, { targetId, manyInfos });
  }
}
