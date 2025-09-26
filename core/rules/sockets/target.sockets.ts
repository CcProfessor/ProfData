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
  const letterB: Letter = { Remetente: 1, Destino: 0, Middle: false };

  // 🔹 Entra na sala do target
  // const enterData: EnterTargetDto = { targetId, name: "MeuTarget", info: "Info adicional" };
  socket.emit(TargetSocketEvents.EnterTarget, targetId, data){
    const { name, info } = data;
    const infos = {
      targetId, name, info
    }
    return { letterA, info };
  };

  // 🔹 Escuta updates de página vindos do player
  const updateData: PageUpdateDto = { targetId, page: 1, status: 1}
  socket.on(TargetSocketEvents.UpdatePage, (data) => {
    console.log("Player atualizou a página:", data);
  });

  // 🔹 Escuta respostas do código (não obrigatoriamente, mas caso necessário)
  const codeResponse: CodeResponseDto = { targetId, codeId: '1', codev: '1' }
  socket.on(TargetSocketEvents.CodeResponse, (data) => {
    console.log("Resposta de código:", data);
  });

  return socket;
}
