import { io } from "socket.io-client";
import { useEffect } from "react";

const socket = io(process.env.SERVER_LINK || "http://localhost:3000");

export function usePlayerSocket(playerId: string, onUpdate: (data: any) => void) {
  useEffect(() => {
    // inscreve no player
    socket.emit("subscribePlayer", playerId);

    // escuta updates
    socket.on("playerUpdate", onUpdate);

    return () => {
      socket.off("playerUpdate", onUpdate);
    };
  }, [playerId, onUpdate]);
}
