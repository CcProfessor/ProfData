import { io, Socket } from "socket.io-client";
import {
  EnterTargetDto,
  CodeResponseDto,
  PageUpdateDto,
} from "./rules/interfaces/gateway.interface";

const socket: Socket = io("http://localhost:3000");

// 🔹 Escutar quando um target entra
export function onTargetEntered(callback: (data: EnterTargetDto) => void) {
  socket.on("targetEntered", callback);
}

// 🔹 Escutar códigos recebidos
export function onCodeReceived(callback: (data: CodeResponseDto) => void) {
  socket.on("codeReceived", callback);
}

// 🔹 Enviar atualização de página/status
export function updatePage(data: PageUpdateDto) {
  socket.emit("updatePage", data);
}

export default socket;
