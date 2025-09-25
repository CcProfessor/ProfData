import { io, Socket } from "socket.io-client";
import { PlayerSocketEvents } from "../interfaces/gateway.interface";

export function connectPlayerSocket(playerId: string) {
  const socket: Socket = io("http://localhost:3000");

  // 🔹 Emite inscrição do player
  socket.emit(PlayerSocketEvents.SubscribePlayer, playerId);

  // 🔹 Escuta quando um target entra
  socket.on(PlayerSocketEvents.EnterTarget, (data) => {
    console.log("Target entrou:", data);
  });

  // 🔹 Escuta mudanças de página (atualizações rápidas do target)
  socket.on(PlayerSocketEvents.FastPageUpdate, (data) => {
    console.log("Fast Page Update recebido:", data);
  });

  // 🔹 Escuta atualização de página enviada pelo player
  socket.on(PlayerSocketEvents.UpdatePage, (data) => {
    console.log("Página atualizada pelo player:", data);
  });

  // 🔹 Escuta respostas de códigos
  socket.on(PlayerSocketEvents.CodeResponse, (data) => {
    console.log("Code response recebido:", data);
  });

  // 🔹 Escuta respostas aleatórias
  socket.on(PlayerSocketEvents.SendResponse, (data) => {
    console.log("Resposta aleatória recebida:", data);
  });

  return socket;
}
