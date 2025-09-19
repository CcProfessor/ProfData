import React, { createContext, useContext, useState, ReactNode } from "react";

export type Target = {
  id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type TargetContextType = {
  target: Target | null;
  loading: boolean;
  createTarget: (name: string) => Promise<void>;
  updateTarget: (id: string, data: Partial<Target>) => Promise<void>;
  clearTarget: () => void;
};

const TargetContext = createContext<TargetContextType | undefined>(undefined);

export function TargetProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<Target | null>(null);
  const [loading, setLoading] = useState(false);

  const createTarget = async (name: string) => {
    setLoading(true);
    try {
      // TODO: substituir pelo fetch real da sua API
      const newTarget: Target = {
        id: String(Date.now()),
        name,
        status: "created",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setTarget(newTarget);
    } finally {
      setLoading(false);
    }
  };

  const updateTarget = async (id: string, data: Partial<Target>) => {
    setLoading(true);
    try {
      if (!target) return;
      const updated: Target = { ...target, ...data, updated_at: new Date().toISOString() };
      setTarget(updated);
    } finally {
      setLoading(false);
    }
  };

  const clearTarget = () => {
    setTarget(null);
  };

  return (
    <TargetContext.Provider value={{ target, loading, createTarget, updateTarget, clearTarget }}>
      {children}
    </TargetContext.Provider>
  );
}

export function useTarget() {
  const context = useContext(TargetContext);
  if (!context) throw new Error("useTarget must be used inside TargetProvider");
  return context;
}
