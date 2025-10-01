import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import {
  TargetResponse,
  CreateTargetDto,
} from "../rules/interfaces/target.interfaces";

import { getTargetById, newTarget } from "../fetchs/target.fetch";

import playerSocket, {
  onTargetEntered,
  onCodeReceived,
  updatePage,
  createNewCode,
} from "../player-socket";

// Tipos adicionais
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

export interface TargetData extends TargetResponse {
  request?: RequestInfo | null;
  client?: ClientInfo | null;
  codes?: any[] | null; // depois pode tipar com CodeResponse[]
}

// ======================
// Contexto
// ======================
type TargetContextType = {
  targetId: string | null;
  targetData: TargetData | null;
  targetStatus: number;
  targetPage: number;
  loading: boolean;
  socket: any;

  createTarget: (dto: CreateTargetDto, token: string) => Promise<void>;
  updateTarget: (id: string, data: Partial<TargetResponse>) => Promise<void>;
  clearTarget: () => void;

  setTargetStatus: (status: number) => void;
  setTargetPage: (page: number) => void;

  // helpers para interagir com socket
  sendPageUpdate: (data: { targetId: string; page: number; status?: number }) => void;
  sendNewCode: (targetId: string, codeId: string) => void;
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

  // Criar Target
  const createTarget = async (dto: CreateTargetDto, token: string) => {
    setLoading(true);

    // dentro de TargetProvider
    React.useEffect(() => {
      // Escuta evento A
      onTargetEntered((data) => {
        console.log("🎯 Target entered:", data);
        setTargetData((prev) =>
          prev
            ? { ...prev, name: data.name, info: data.info }
            : { id: data.targetId, name: data.name, info: data.info, page: 0, status: 0 }
        );
      });

      // Escuta evento B
      onCodeReceived((code) => {
        console.log("🔑 Code received:", code);
        setTargetData((prev) => {
          const codes = prev?.codes ?? [];
          return { ...prev!, codes: [...codes, code] };
        });
      });
    }, []);

    try {
      const created = await newTarget(dto, token);

      setTargetId(created.id);
      setTargetData(created);
      setTargetStatus(created.status);
      setTargetPage(created.page);

      // Configura listeners
      /*
      onTargetEntered((data) => {
        console.log("Target entered:", data);
        setTargetData((prev) => (prev ? { ...prev, ...data } : { ...created, ...data }));
      });

      onCodeReceived((code) => {
        console.log("Code received:", code);
        setTargetData((prev) => {
          const codes = prev?.codes ?? [];
          return { ...prev!, codes: [...codes, code] };
        });
      });
      */
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

      // 🔹 repassa para o socket
      updatePage({ targetId: id, ...data } as any);
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
  };

  // Helpers de envio
  const sendPageUpdate = (data: { targetId: string; page: number; status?: number }) => {
    updatePage(data);
  };

  const sendNewCode = (tid: string, codeId: string) => {
    createNewCode(tid, codeId);
  };

  return (
    <TargetContext.Provider
      value={{
        targetId,
        targetData,
        targetStatus,
        targetPage,
        loading,
        socket: playerSocket,
        createTarget,
        updateTarget,
        clearTarget,
        setTargetStatus,
        setTargetPage,
        sendPageUpdate,
        sendNewCode,
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
