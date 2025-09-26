import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  TargetSocketEvents,
  PlayerSocketEvents,
  GatewayClientEvents,
  Letter,
} from '../interfaces/gateway.interface';

@WebSocketGateway({ cors: true })
export class MainGateway {
  @WebSocketServer()
  server!: Server;

  // 🔹 Helper para criar cartas
  private makeLetter(rem: number, dest: number, middle = false): Letter {
    return { Remetente: rem, Destino: dest, Middle: middle };
  }

  // 1️⃣ Envia para Target
  sendToTarget(targetId: string, event: string, data: any) {
    this.server.to(targetId).emit(event, { ...data, letter: this.makeLetter(0, 1) });
  }

  // 2️⃣ Envia para Player
  sendToPlayer(playerId: string, event: string, data: any) {
    this.server.to(playerId).emit(event, { ...data, letter: this.makeLetter(1, 0) });
  }

  // 3️⃣ Ouve de Target
  @SubscribeMessage(GatewayClientEvents.FromTarget)
  handleFromTarget(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(`📥 [Target->Server] ${client.id}`, data);
    return { ok: true, letter: this.makeLetter(1, 0) };
  }

  // 4️⃣ Ouve de Player
  @SubscribeMessage(GatewayClientEvents.FromPlayer)
  handleFromPlayer(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(`📥 [Player->Server] ${client.id}`, data);
    return { ok: true, letter: this.makeLetter(0, 1) };
  }

  // 5️⃣ Ouve de Target → repassa para Player
  @SubscribeMessage(GatewayClientEvents.TargetToPlayer)
  handleTargetToPlayer(@MessageBody() { playerId, payload }: any) {
    this.server.to(playerId).emit(PlayerSocketEvents.Forwarded, {
      ...payload,
      letter: this.makeLetter(1, 0, true),
    });
  }

  // 6️⃣ Ouve de Player → repassa para Target
  @SubscribeMessage(GatewayClientEvents.PlayerToTarget)
  handlePlayerToTarget(@MessageBody() { targetId, payload }: any) {
    this.server.to(targetId).emit(TargetSocketEvents.Forwarded, {
      ...payload,
      letter: this.makeLetter(0, 1, true),
    });
  }
}
