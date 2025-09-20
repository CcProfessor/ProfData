import { io } from "socket.io-client";

export function connectTargetSocket(targetId: string) {
  const socket = io("http://localhost:3000");

  // ✅ Entrar no room
  socket.emit("joinTarget", targetId);

  // 🔹 Escutar eventos

  // Evento A, do outro lado:
  socket.on("targetEntered", (data) => {
    console.log("O Target entrou:", data);
  });

  // Evento B, deste lado:
  socket.on("targetStatusInit", (data) => {
    console.log("Status inicial recebido:", data);
  });
  // Quando o Client recebe os dados, vai tanto disparar na persistência, quanto atualizar as informações aqui do lado do operador


  // Evento C, de ambos os lados:
  socket.on("targetPageUpdated", (data) => {
    console.log("Página autorizada:", data.page);
  });
  // O Operador(outro lado), informa qual página o cliente vai ter ascesso.
  // Página 1: Inicial
  // Página 2: Loading
  // Página 3: Requisição
  // Página 4: Ascesso

  return socket;
}
