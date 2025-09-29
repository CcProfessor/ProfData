import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import type { PageUpdateDto } from '../rules/interfaces/gateway.interface';

@WebSocketGateway({ cors: true })
export class PlayerGateway {
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    client.join('players'); // todos os players ficam na sala "players"
    console.log(`✅ Player conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Player desconectado: ${client.id}`);
  }

  // 🔹 C: Player envia atualização de página
  @SubscribeMessage('updatePage')
  handlePageUpdate(
    @MessageBody() payload: PageUpdateDto,
    @ConnectedSocket() client: Socket,
  ) {
    // repassa para o target
    this.server.to(payload.targetId).emit('pageUpdated', payload);
    return { ok: true };
  }
}
