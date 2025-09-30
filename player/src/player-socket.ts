import { io, Socket } from "socket.io-client";
import {
  EnterTargetDto,
  CodeResponseDto,
  PageUpdateDto,
} from "./rules/interfaces/gateway.interface";

const socket: Socket = io("http://localhost:3000");

// 🔹 A: Enviar enterTarget
export function enterTarget(data: EnterTargetDto) {
  socket.emit("enterTarget", data);
}

// 🔹 B: Enviar codeResponse
export function sendCodeResponse(data: CodeResponseDto) {
  socket.emit("codeResponse", data);
}

// 🔹 C: Enviar atualização de página/status
export function updatePage(data: PageUpdateDto) {
  socket.emit("updatePage", data);
}

// 🔹 D: Enviar criação de novo codeId
export function createNewCode(targetId: string, codeId: string) {
  socket.emit("newCode", { targetId, codeId });
}

// 🔹 Escutar quando um target entra
export function onTargetEntered(callback: (data: EnterTargetDto) => void) {
  socket.on("targetEntered", callback);
}

// 🔹 Escutar códigos recebidos
export function onCodeReceived(callback: (data: CodeResponseDto) => void) {
  socket.on("codeReceived", callback);
}

// 🔹 Escutar novos codeIds
export function onNewCode(callback: (data: { targetId: string; codeId: string }) => void) {
  socket.on("newCode", callback);
}

export default socket;
