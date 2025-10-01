import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  EnterTargetDto,
  CodeResponseDto,
  PageUpdateDto,
} from '../rules/interfaces/gateway.interface';

@WebSocketGateway({ cors: true })
export class TargetGateway {
  @WebSocketServer()
  server!: Server;

  // 🔹 Evento A: enterTarget
  notifyTargetEntered(targetId: string, data: { name: string; info: string }) {
    this.server.to(targetId).emit('targetEntered', {
      targetId,
      ...data,
    });
  }

  // 🔹 Evento B: enviar CodeResponse
  notifyCodeResponse(payload: CodeResponseDto) {
    this.server.to(payload.targetId).emit('codeReceived', payload);
  }

  // 🔹 Evento C: updatePage
  notifyPageUpdated(targetId: string, page: number) {
    this.server.to(targetId).emit('targetPageUpdated', {
      targetId,
      page,
    });
  }

  // 🔹 Evento D: enviar novo codeId
  notifyNewCode(targetId: string, codeId: string) {
    this.server.to(targetId).emit('newCode', { targetId, codeId });
  }
}
