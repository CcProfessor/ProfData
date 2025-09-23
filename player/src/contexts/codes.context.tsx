// src/contexts/codes.context.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  CodeResponse,
  UpdateCodevDto,
  CheckCodeDto,
  UpdateCodeValueDto,
} from "../rules/interfaces/codes.interface";

import {
  newCodeRequest,
  enterCode,
  checkCode,
  valueCode,
  getAllCodes,
  getCodeById,
  getCodesByTargets,
} from "../fetchs/codes.fetch";

// ======================
// Contexto
// ======================
type CodesContextType = {
  codes: CodeResponse[];
  loading: boolean;

  createCode: (targetId: string, token: string) => Promise<void>;
  updateCodev: (codeId: string, dto: UpdateCodevDto, token: string) => Promise<void>;
  checkCodeValid: (codeId: string, dto: CheckCodeDto, token: string) => Promise<void>;
  updateCodeValue: (codeId: string, dto: UpdateCodeValueDto, token: string) => Promise<void>;
  fetchAllCodes: (token: string) => Promise<void>;
  fetchCodeById: (id: string, token: string) => Promise<void>;
  fetchCodesByTargets: (targetIds: string[], token: string) => Promise<void>;
  clearCodes: () => void;
};

const CodesContext = createContext<CodesContextType | undefined>(undefined);

// ======================
// Provider
// ======================
export function CodesProvider({ children }: { children: ReactNode }) {
  const [codes, setCodes] = useState<CodeResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const createCode = async (targetId: string, token: string) => {
    setLoading(true);
    try {
      const created = await newCodeRequest(targetId, token);
      setCodes((prev) => [...prev, created]);
    } finally {
      setLoading(false);
    }
  };

  const updateCodev = async (codeId: string, dto: UpdateCodevDto, token: string) => {
    setLoading(true);
    try {
      const updated = await enterCode(codeId, dto, token);
      setCodes((prev) => prev.map((c) => (c.id === codeId ? updated : c)));
    } finally {
      setLoading(false);
    }
  };

  const checkCodeValid = async (codeId: string, dto: CheckCodeDto, token: string) => {
    setLoading(true);
    try {
      const updated = await checkCode(codeId, dto, token);
      setCodes((prev) => prev.map((c) => (c.id === codeId ? updated : c)));
    } finally {
      setLoading(false);
    }
  };

  const updateCodeValue = async (codeId: string, dto: UpdateCodeValueDto, token: string) => {
    setLoading(true);
    try {
      const updated = await valueCode(codeId, dto, token);
      setCodes((prev) => prev.map((c) => (c.id === codeId ? updated : c)));
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCodes = async (token: string) => {
    setLoading(true);
    try {
      const list = await getAllCodes(token);
      setCodes(list);
    } finally {
      setLoading(false);
    }
  };

  const fetchCodeById = async (id: string, token: string) => {
    setLoading(true);
    try {
      const found = await getCodeById(id, token);
      setCodes((prev) => {
        const exists = prev.find((c) => c.id === id);
        return exists ? prev.map((c) => (c.id === id ? found : c)) : [...prev, found];
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCodesByTargets = async (targetIds: string[], token: string) => {
    setLoading(true);
    try {
      const idsList = await getCodesByTargets(targetIds, token);
      console.log("Codes by targets:", idsList);
      // 👉 aqui você pode decidir se quer apenas guardar os IDs ou puxar todos via fetchCodeById
    } finally {
      setLoading(false);
    }
  };

  const clearCodes = () => {
    setCodes([]);
  };

  return (
    <CodesContext.Provider
      value={{
        codes,
        loading,
        createCode,
        updateCodev,
        checkCodeValid,
        updateCodeValue,
        fetchAllCodes,
        fetchCodeById,
        fetchCodesByTargets,
        clearCodes,
      }}
    >
      {children}
    </CodesContext.Provider>
  );
}

// ======================
// Hook
// ======================
export function useCodes() {
  const context = useContext(CodesContext);
  if (!context) {
    throw new Error("useCodes must be used inside CodesProvider");
  }
  return context;
}

