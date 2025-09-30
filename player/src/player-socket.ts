import { io, Socket } from "socket.io-client";
import {
  EnterTargetDto,
  CodeResponseDto,
  PageUpdateDto,
} from "./rules/interfaces/gateway.interface";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

const socket: Socket = io(BASE_URL);

// 🔹 A. Recebe dados do enterTarget
export function onTargetEntered(callback: (data: EnterTargetDto) => void) {
  socket.on("targetEntered", callback);
}

// 🔹 B. Recebe dados do CodeResponse
export function onCodeReceived(callback: (data: CodeResponseDto) => void) {
  socket.on("codeReceived", callback);
}

// 🔹 C. Envia atualização de página/status
export function updatePage(data: PageUpdateDto) {
  socket.emit("updatePage", data);
}

// 🔹 D. Envia id de novo código
export function createNewCode(targetId: string, codeId: string) {
  socket.emit("newCode", { targetId, codeId });
}

export default socket;
