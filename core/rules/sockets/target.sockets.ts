import { io, Socket } from "socket.io-client";
import {
  TargetSocketEvents,
  EnterTargetDto,
  SendResponseDto,
  CodeResponseDto,
  PageUpdateDto,
  Letter,
 } from "../interfaces/gateway.interface";

export function connectTargetSocket(targetId: string, data: any) {
  const socket: Socket = io("http://localhost:3000");

  const letterA: Letter = { Remetente: 1, Destino: 2, Middle: false };
  const letterB: Letter = { Remetente: 1, Destino: 0, Middle: false }; // Não acho que vai usar

  // 🔹 Entra na sala do target
  socket.emit(TargetSocketEvents.EnterTarget, targetId, data, () => {
    const { name, info } = data;
    const infos: EnterTargetDto = {
      targetId, name, info
    }
    return { letterA, infos };
    
  });

  // 🔹 Envia um código
  socket.emit(TargetSocketEvents.EnterTarget, targetId, data, () => {
    const { codeId, codev } = data;
    const infos: CodeResponseDto = {
      targetId, codeId, codev
    }
    return { letterA, infos };
    
  });

  // 🔹 Escuta updates de página vindos do player
  socket.on(TargetSocketEvents.UpdatePage, (targetId, data, Letter) => {
    console.log("Player atualizou a página:", data);

    const { status, page } = data as PageUpdateDto;

    // Tarefa 1.
    // Aqui precisa mudar o valor na instância e no Context na parte do player.
  });

  // 🔹 Escuta respostas do código (Somente se nescessário no futuro)
  socket.on(TargetSocketEvents.CodeResponse, (targetId, data, Letter) => {
    console.log("Resposta de código:", data);

    const { codeId, codev } = data as CodeResponseDto;

    // Tarefa 2.
    // Aqui muda o codev dos códigos na instância e no Context na parte do player.
  });

  return socket;
}
