import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

// ✅ Entrar no mesmo room
socket.emit("joinTarget", targetId);

// 🔹 Escutar eventos
socket.on("targetEntered", (data) => {
  console.log("Cliente entrou no target:", data);
});

socket.on("targetStatusInit", (data) => {
  console.log("Status do cliente:", data);
});

socket.on("targetPageUpdated", (data) => {
  console.log("Cliente pode ir para página:", data.page);
});
