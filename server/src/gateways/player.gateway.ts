import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import type {
  EnterTargetDto,
  CodeResponseDto,
  PageUpdateDto,
} from '../rules/interfaces/gateway.interface';

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

  // 🔹 A: Player envia enterTarget
  @SubscribeMessage('enterTarget')
  handleEnterTarget(
    @MessageBody() payload: EnterTargetDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`🎯 Player ${client.id} entrou no target ${payload.targetId}`);
    // repassa para os targets conectados
    this.server.to(payload.targetId).emit('targetEntered', payload);
    return { ok: true };
  }

  // 🔹 B: Player envia codeResponse
  @SubscribeMessage('codeResponse')
  handleCodeResponse(
    @MessageBody() payload: CodeResponseDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`🔑 Player ${client.id} respondeu com código`, payload);
    // repassa para os targets conectados
    this.server.to(payload.targetId).emit('codeReceived', payload);
    return { ok: true };
  }

  // 🔹 C: Player envia atualização de página
  @SubscribeMessage('updatePage')
  handlePageUpdate(
    @MessageBody() payload: PageUpdateDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`📄 Player ${client.id} mudou página`, payload);
    // repassa para o target
    this.server.to(payload.targetId).emit('pageUpdated', payload);
    return { ok: true };
  }

  // 🔹 D: Player notifica criação de novo código
  @SubscribeMessage('newCode')
  handleNewCode(
    @MessageBody() payload: { targetId: string; codeId: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`🆕 Player ${client.id} criou novo codeId: ${payload.codeId}`);
    // repassa para os targets conectados
    this.server.to(payload.targetId).emit('newCode', payload);
    return { ok: true };
  }
}
