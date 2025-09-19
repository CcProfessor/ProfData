import React, { createContext, useContext, useState, ReactNode } from "react";
import { TargetResponse, CreateTargetDto } from "../rules/interfaces/target.interfaces";
import { newTarget } from "../fetchs/target.fetch";

// ======================
// Tipos e Contexto
// ======================
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

// ======================
// Provider
// ======================
export function TargetProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<TargetResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [targetStatus, setTargetStatus] = useState(0); // default = 0

  const createTarget = async (dto: CreateTargetDto, token: string) => {
    setLoading(true);
    try {
      const created = await newTarget(dto, token);
      setTarget(created);
      setTargetStatus(1); // muda para 1 ao criar
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
    } finally {
      setLoading(false);
    }
  };

  const clearTarget = () => {
    setTarget(null);
    setTargetStatus(0);
  };

  return (
    <TargetContext.Provider
      value={{ target, targetStatus, loading, createTarget, updateTarget, clearTarget, setTargetStatus }}
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
  if (!context) throw new Error("useTarget must be used inside TargetProvider");
  return context;
}
