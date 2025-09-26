@WebSocketGateway({ cors: true })
export class TargetGateway {
  @WebSocketServer()
  server!: Server;

  @SubscribeMessage(GatewayClientEvents.EnterTarget)
  handleEnterTarget(
    @MessageBody() payload: { Letter: Letter; EnterTargetDto: EnterTargetDto },
    @ConnectedSocket() client: Socket
  ) {
    const { Letter, EnterTargetDto } = payload;

    // Target entra na sua própria sala
    client.join(EnterTargetDto.targetId);
    console.log(`Target ${EnterTargetDto.targetId} entrou, client ${client.id}`);

    // Se a mensagem for para o Player, marca Middle = true antes de emitir
    if (Letter.Destino === 2 && Letter.Remetente === 1 && !Letter.Middle) {
      const newLetter = { ...Letter, Middle: true };
      this.server.to(EnterTargetDto.targetId).emit(GatewayServerEvents.EnterTarget, { Letter: newLetter, EnterTargetDto });
    }
  }
}