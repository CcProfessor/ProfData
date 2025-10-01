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
export class TargetGateway {
  @WebSocketServer()
  server!: Server;

  // Conexão e desconexão
  handleConnection(client: Socket) {
    console.log(`✅ Target conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Target desconectado: ${client.id}`);
  }

  // 🔹 A: Target envia enterTarget (pode ser usado se quiser registrar entrada)
  @SubscribeMessage('enterTarget')
  handleEnterTarget(
    @MessageBody() payload: EnterTargetDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(payload.targetId); // target entra na sua própria sala
    console.log(`🎯 Target ${payload.targetId} conectado pelo socket ${client.id}`);
    // repassa para os players
    this.server.to('players').emit('targetEntered', payload);
    return { ok: true };
  }
  // usado pelo service
  emitTargetEntered(targetId: string, data: EnterTargetDto) {
    this.server.to('players').emit('targetEntered', data);
    console.log(`📢 Emitido targetEntered para players: ${targetId}`);
  }

  // 🔹 B: Target envia codeResponse
  @SubscribeMessage('codeResponse')
  handleCodeResponse(
    @MessageBody() payload: CodeResponseDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`🔑 Target ${payload.targetId} respondeu com código`, payload);
    // repassa para os players
    this.server.to('players').emit('codeReceived', payload);
    return { ok: true };
  }
  emitCodeResponse(payload: CodeResponseDto) {
    this.server.to('players').emit('codeReceived', payload);
    console.log(`📢 Emitido codeReceived para players:`, payload);
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
