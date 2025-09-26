import { io, Socket } from "socket.io-client";
import { TargetSocketEvents, EnterTargetDto, Letter } from "../interfaces/gateway.interface";

export function connectTargetSocket(targetId: string) {
  const socket: Socket = io("http://localhost:3000");

  const letter: Letter = { Remetente: 1, Destino: 2, Middle: false };

  // 🔹 Entra na sala do target
  socket.emit(TargetSocketEvents.EnterTarget, targetId);

  // 🔹 Escuta updates de página vindos do player
  socket.on(TargetSocketEvents.UpdatePage, (data) => {
    console.log("Player atualizou a página:", data);
  });

  // 🔹 Escuta respostas do código (não obrigatoriamente, mas caso necessário)
  socket.on(TargetSocketEvents.CodeResponse, (data) => {
    console.log("Resposta de código:", data);
  });

  return socket;
}
