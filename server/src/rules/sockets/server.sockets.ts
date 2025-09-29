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

  // 🔹 Decide destino e reencaminha se necessário
  private handleRouting(event: string, data: any) {
    const { letter, targetId, playerId } = data;

    if (!letter || typeof letter.Destino !== 'number') {
      console.warn(`❗ Evento ${event} recebido sem letter válido`, data);
      return;
    }

    switch (letter.Destino) {
      case 0:
        // não envia para ninguém
        console.log(`📭 Evento ${event} consumido sem envio`);
        break;

      case 1:
        // envia para Target
        if (targetId) {
          this.server.to(targetId).emit(event, {
            ...data,
            letter: { ...letter, Middle: true },
          });
          console.log(`➡️ Evento ${event} roteado para Target ${targetId}`);
        }
        break;

      case 2:
        // envia para Player
        if (playerId) {
          this.server.to(playerId).emit(event, {
            ...data,
            letter: { ...letter, Middle: true },
          });
          console.log(`➡️ Evento ${event} roteado para Player ${playerId}`);
        }
        break;

      default:
        console.warn(`❓ Destino desconhecido no evento ${event}`, letter);
    }
  }

  // 1️⃣ Ouve eventos vindos do Target
  @SubscribeMessage(TargetSocketEvents.EnterTarget)
  handleTargetEnter(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(`📥 [Target->Server] ${client.id} EnterTarget`, data);
    this.handleRouting(TargetSocketEvents.EnterTarget, data);
  }

  @SubscribeMessage(TargetSocketEvents.UpdatePage)
  handleTargetUpdatePage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(`📥 [Target->Server] ${client.id} UpdatePage`, data);
    this.handleRouting(TargetSocketEvents.UpdatePage, data);
  }

  @SubscribeMessage(TargetSocketEvents.FastPageUpdate)
  handleTargetFastPage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(`📥 [Target->Server] ${client.id} FastPageUpdate`, data);
    this.handleRouting(TargetSocketEvents.FastPageUpdate, data);
  }

  @SubscribeMessage(TargetSocketEvents.CodeResponse)
  handleTargetCode(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(`📥 [Target->Server] ${client.id} CodeResponse`, data);
    this.handleRouting(TargetSocketEvents.CodeResponse, data);
  }

  @SubscribeMessage(TargetSocketEvents.SendResponse)
  handleTargetSend(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(`📥 [Target->Server] ${client.id} SendResponse`, data);
    this.handleRouting(TargetSocketEvents.SendResponse, data);
  }

  // 2️⃣ Ouve eventos vindos do Player
  @SubscribeMessage(PlayerSocketEvents.EnterTarget)
  handlePlayerEnter(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(`📥 [Player->Server] ${client.id} EnterTarget`, data);
    this.handleRouting(PlayerSocketEvents.EnterTarget, data);
  }

  @SubscribeMessage(PlayerSocketEvents.UpdatePage)
  handlePlayerUpdatePage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(`📥 [Player->Server] ${client.id} UpdatePage`, data);
    this.handleRouting(PlayerSocketEvents.UpdatePage, data);
  }

  @SubscribeMessage(PlayerSocketEvents.FastPageUpdate)
  handlePlayerFastPage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(`📥 [Player->Server] ${client.id} FastPageUpdate`, data);
    this.handleRouting(PlayerSocketEvents.FastPageUpdate, data);
  }

  @SubscribeMessage(PlayerSocketEvents.CodeResponse)
  handlePlayerCode(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(`📥 [Player->Server] ${client.id} CodeResponse`, data);
    this.handleRouting(PlayerSocketEvents.CodeResponse, data);
  }

  @SubscribeMessage(PlayerSocketEvents.SendResponse)
  handlePlayerSend(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(`📥 [Player->Server] ${client.id} SendResponse`, data);
    this.handleRouting(PlayerSocketEvents.SendResponse, data);
  }
}
