import { io, Socket } from "socket.io-client";
import {
  EnterTargetDto,
  CodeResponseDto,
  SendResponseDto,
  PageUpdateDto,
} from "./rules/interfaces/gateway.interface";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

const socket: Socket = io(BASE_URL);

// 🔹 Enviar enterTarget (pode incluir SendResponseDto junto)
export function enterTarget(data: EnterTargetDto & Partial<SendResponseDto>) {
  socket.emit("enterTarget", data);
}

// 🔹 Enviar CodeResponse
export function sendCodeResponse(data: CodeResponseDto) {
  socket.emit("codeResponse", data);
}

// 🔹 Escutar atualizações de página (enviadas pelos players)
export function onPageUpdate(callback: (data: PageUpdateDto) => void) {
  socket.on("pageUpdated", callback);
}

// 🔹 Escutar novos codes (server envia { targetId, codeId })
export function onNewCode(callback: (data: { targetId: string; codeId: string }) => void) {
  socket.on("newCode", callback);
}

export default socket;
