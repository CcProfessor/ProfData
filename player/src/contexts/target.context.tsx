import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { TargetResponse, CreateTargetDto } from "../rules/interfaces/target.interfaces";
import { newTarget } from "../fetchs/target.fetch";
import { connectTargetSocket } from "../gateway/socket";

type TargetContextType = {
  target: TargetResponse | null;
  targetStatus: number;
  loading: boolean;
  createTarget: (dto: CreateTargetDto, token: string) => Promise<void>;
  updateTarget: (id: string, data: Partial<TargetResponse>) => Promise<void>;
  clearTarget: () => void;
  setTargetStatus: (status: number) => void;
};

const TargetContext = createContext<TargetContextType | undefined>(undefined);

export function TargetProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<TargetResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [targetStatus, setTargetStatus] = useState(0);
  const [socket, setSocket] = useState<any>(null);

  const createTarget = async (dto: CreateTargetDto, token: string) => {
    setLoading(true);
    try {
      const created = await newTarget(dto, token);
      setTarget(created);
      setTargetStatus(1);

      // 🔌 conecta socket automaticamente
      const sock = connectTargetSocket(created.id);
      setSocket(sock);

      // escuta eventos do socket
      sock.on("targetStatusInit", (data: any) => {
        setTargetStatus(data.status);
        setTarget((prev) => prev ? { ...prev, status: data.status } : prev);
      });

      sock.on("targetPageUpdated", (data: any) => {
        setTarget((prev) => prev ? { ...prev, page: data.page } : prev);
      });

    } finally {
      setLoading(false);
    }
  };

  const updateTarget = async (id: string, data: Partial<TargetResponse>) => {
    if (!target) return;
    setLoading(true);
    try {
      const updated: TargetResponse = { ...target, ...data, updated_at: new Date() };
      setTarget(updated);

      // 🚀 se quiser notificar o server via socket:
      if (socket) {
        socket.emit("updateTarget", { id, ...data });
      }
    } finally {
      setLoading(false);
    }
  };

  const clearTarget = () => {
    setTarget(null);
    setTargetStatus(0);
    if (socket) socket.disconnect();
    setSocket(null);
  };

  return (
    <TargetContext.Provider
      value={{ target, targetStatus, loading, createTarget, updateTarget, clearTarget, setTargetStatus }}
    >
      {children}
    </TargetContext.Provider>
  );
}

export function useTarget() {
  const context = useContext(TargetContext);
  if (!context) throw new Error("useTarget must be used inside TargetProvider");
  return context;
}
