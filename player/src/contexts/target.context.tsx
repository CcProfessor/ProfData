import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import {
  TargetResponse,
  CreateTargetDto,
} from "../rules/interfaces/target.interfaces";
import { newTarget } from "../fetchs/target.fetch";
import { connectTargetSocket } from "../gateway/socket";

// Tipos adicionais para enriquecer targetData
export interface RequestInfo {
  ip?: string;
  port?: number;
  tlsVersion?: string;
  transport?: string;
  origin?: string;
  connection?: string;
  userAgent?: string;
  referer?: string;
  host?: string;
  createdAt: Date;
}

export interface ClientInfo {
  screenWidth?: number;
  screenHeight?: number;
  timezone?: string;
  language?: string;
  platform?: string;
  deviceMemory?: number;
  hardwareConcurrency?: number;
  createdAt: Date;
}

// Estrutura consolidada de dados do Target
export interface TargetData extends TargetResponse {
  request?: RequestInfo | null;
  client?: ClientInfo | null;
}

// ======================
// Contexto
// ======================
type TargetContextType = {
  targetId: string | null;
  targetData: TargetData | null;
  targetStatus: number; // status do target
  targetPage: number; // página do target
  loading: boolean;
  socket: any;

  createTarget: (dto: CreateTargetDto, token: string) => Promise<void>;
  updateTarget: (id: string, data: Partial<TargetResponse>) => Promise<void>;
  clearTarget: () => void;

  setTargetStatus: (status: number) => void;
  setTargetPage: (page: number) => void;
};

const TargetContext = createContext<TargetContextType | undefined>(undefined);

// ======================
// Provider
// ======================
export function TargetProvider({ children }: { children: ReactNode }) {
  const [targetId, setTargetId] = useState<string | null>(null);
  const [targetData, setTargetData] = useState<TargetData | null>(null);
  const [targetStatus, setTargetStatus] = useState<number>(0);
  const [targetPage, setTargetPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<any>(null);

  // Criar Target
  const createTarget = async (dto: CreateTargetDto, token: string) => {
    setLoading(true);
    try {
      const created = await newTarget(dto, token);

      setTargetId(created.id);
      setTargetData(created);
      setTargetStatus(created.status);
      setTargetPage(created.page);

      // Conectar socket
      const sock = connectTargetSocket(created.id);
      setSocket(sock);

      // Eventos do socket
      sock.on("targetStatusInit", (data: any) => {
        setTargetStatus(data.status);
        setTargetData((prev) =>
          prev ? { ...prev, status: data.status } : prev
        );
      });

      sock.on("targetPageUpdated", (data: any) => {
        setTargetPage(data.page);
        setTargetData((prev) =>
          prev ? { ...prev, page: data.page } : prev
        );
      });
    } finally {
      setLoading(false);
    }
  };

  // Atualizar Target local e opcionalmente notificar servidor
  const updateTarget = async (id: string, data: Partial<TargetResponse>) => {
    if (!targetData) return;
    setLoading(true);
    try {
      const updated: TargetData = {
        ...targetData,
        ...data,
        updated_at: new Date(),
      };
      setTargetData(updated);

      if (data.status !== undefined) setTargetStatus(data.status);
      if (data.page !== undefined) setTargetPage(data.page);

      if (socket) {
        socket.emit("updateTarget", { id, ...data });
      }
    } finally {
      setLoading(false);
    }
  };

  // Limpar Target
  const clearTarget = () => {
    setTargetId(null);
    setTargetData(null);
    setTargetStatus(0);
    setTargetPage(0);
    if (socket) socket.disconnect();
    setSocket(null);
  };

  return (
    <TargetContext.Provider
      value={{
        targetId,
        targetData,
        targetStatus,
        targetPage,
        loading,
        socket,
        createTarget,
        updateTarget,
        clearTarget,
        setTargetStatus,
        setTargetPage,
      }}
    >
      {children}
    </TargetContext.Provider>
  );
}

// ======================
// Hook
// ======================
export function useTarget() {
  const context = useContext(TargetContext);
  if (!context) {
    throw new Error("useTarget must be used inside TargetProvider");
  }
  return context;
}
