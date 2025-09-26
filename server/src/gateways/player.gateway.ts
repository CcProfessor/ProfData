import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class PlayerGateway {
  @WebSocketServer()
  server!: Server;

  // 🔹 Emitir evento quando player for atualizado
  notifyPlayerUpdate(playerId: string, data: any) {
    this.server.to(playerId).emit('playerUpdate', data);
  }

  // 🔹 Cliente pode se inscrever num playerId
  @SubscribeMessage('subscribePlayer')
  handleSubscribe(@MessageBody() playerId: string) {
    // cliente entra na "sala" do player
    return { event: 'subscribed', playerId };
  }
}
