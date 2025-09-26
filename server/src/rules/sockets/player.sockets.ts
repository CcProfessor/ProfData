import { io, Socket } from "socket.io-client";
import { PlayerSocketEvents } from "../interfaces/gateway.interface";

export function connectPlayerSocket(playerId: string) {
  const socket: Socket = io("http://localhost:3000");

  const letterA = { Remetente: 1, Destino: 2, Middle: false };

  // 🔹 Emite inscrição do player
  socket.emit(PlayerSocketEvents.SubscribePlayer, playerId, () => {
    return { playerId, letterA };
  });

  // 🔹 Escuta quando um target entra
  socket.on(PlayerSocketEvents.EnterTarget, (data) => {
    console.log("Target entrou:", data);
    const { targetId } = data;
    return { targetId, letterA };
  });

  // 🔹 Escuta mudanças de página (atualizações rápidas do target)
  socket.on(PlayerSocketEvents.FastPageUpdate, (data) => {
    console.log("Fast Page Update recebido:", data);
    const { targetId, page, status } = data;
    return { targetId, page, status, letterA };
  });

  // 🔹 Escuta atualização de página enviada pelo player
  socket.on(PlayerSocketEvents.UpdatePage, (data) => {
    console.log("Página atualizada pelo player:", data);
    const { targetId, page, status } = data;
    return { targetId, page, status, letterA };
  });

  // 🔹 Escuta respostas de códigos
  socket.on(PlayerSocketEvents.CodeResponse, (data) => {
    console.log("Code response recebido:", data);
    const { targetId, codeId, codev } = data;
    return { targetId, codeId, codev, letterA };
  });

  // 🔹 Escuta respostas aleatórias
  socket.on(PlayerSocketEvents.SendResponse, (data) => {
    console.log("Resposta aleatória recebida:", data);
    const { targetId, manyInfos } = data;
    return { targetId, manyInfos, letterA };
  });

  return socket;
}
