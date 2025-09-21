import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class TargetGateway {
  @WebSocketServer()
  server!: Server; // ✅ corrige o erro (E) com `!`

  @SubscribeMessage('joinTarget')
  handleJoinTarget(
    @MessageBody() targetId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(targetId);
    console.log(`Client ${client.id} entrou no target ${targetId}`);
  }

  // 🔹 Evento A: enterTarget
  notifyTargetEntered(targetId: string, data: { name: string; info: string }) {
    this.server.to(targetId).emit('targetEntered', {
      targetId,
      ...data,
    });
  }

  // 🔹 Evento B: initStatus
  notifyStatusInit(targetId: string, success: boolean) {
    this.server.to(targetId).emit('targetStatusInit', {
      targetId,
      success,
    });
  }

  // 🔹 Evento C: updatePage
  notifyPageUpdated(targetId: string, page: number) {
    this.server.to(targetId).emit('targetPageUpdated', {
      targetId,
      page,
    });
  }
}
