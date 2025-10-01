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
    console.log(`✅ Target conectado(Server -> Target): ${client.id}`);
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

  // 🔹 C: Target envia atualização de página
  @SubscribeMessage('updatePage')
  handlePageUpdate(
    @MessageBody() payload: PageUpdateDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`📄 Target ${payload.targetId} mudou página`, payload);
    // repassa para os players
    this.server.to('players').emit('targetPageUpdated', payload);
    return { ok: true };
  }
  emitPageUpdate(targetId: string, page: number) {
    const payload: PageUpdateDto = { targetId, page };
    this.server.to('players').emit('targetPageUpdated', payload);
    console.log(`📢 Emitido targetPageUpdated para players:`, payload);
  }

  // 🔹 D: Target envia criação de novo código
  @SubscribeMessage('newCode')
  handleNewCode(
    @MessageBody() payload: { targetId: string; codeId: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`🆕 Target ${payload.targetId} criou novo codeId: ${payload.codeId}`);
    // repassa para os players
    this.server.to('players').emit('newCode', payload);
    return { ok: true };
  }
  emitNewCode(targetId: string, codeId: string) {
    const payload = { targetId, codeId };
    this.server.to('players').emit('newCode', payload);
    console.log(`📢 Emitido newCode para players:`, payload);
  }
}
