import { io, Socket } from "socket.io-client";
import {
  EnterTargetDto,
  CodeResponseDto,
  SendResponseDto,
  PageUpdateDto,
} from "./rules/interfaces/gateway.interface";

const socket: Socket = io("http://localhost:3000"); // URL do backend

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

export default socket;
