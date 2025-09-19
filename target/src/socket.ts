import { io } from "socket.io-client";

export function connectTargetSocket(targetId: string) {
  const socket = io("http://localhost:3000");

  // ✅ Entrar no room
  socket.emit("joinTarget", targetId);

  // 🔹 Escutar eventos
  socket.on("targetEntered", (data) => {
    console.log("Novo target entrou:", data);
  });

  socket.on("targetStatusInit", (data) => {
    console.log("Status inicial recebido:", data);
  });

  socket.on("targetPageUpdated", (data) => {
    console.log("Página autorizada:", data.page);
  });

  return socket;
}
