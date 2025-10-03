import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // ou coloque a URL do frontend
  },
})
export class AppGateway {
  @WebSocketServer()
  server!: Server;

  handleConnection(socket: Socket) {
    console.log(`✅ Cliente conectado: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`❌ Cliente desconectado: ${socket.id}`);
  }

  @SubscribeMessage('mensagem')
  handleMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    console.log('📩 Mensagem recebida:', data);
    socket.emit('resposta', { ok: true, recebido: data });
  }
}
