import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import socket, { enterTarget, onPageUpdate } from "../target-socket"; 
import { TargetResponse } from "../rules/interfaces/target.interfaces";
import { PageUpdateDto } from "../rules/interfaces/gateway.interface";
import { CodeResponse } from "../rules/interfaces/codes.interface";

/**
 * Context for Target (client app)
 */
type TargetContextValue = {
  targetId: string | null;
  setTargetId: (id: string | null) => void;

  targetData: TargetResponse | null;
  setTargetData: (d: TargetResponse | null) => void;

  currentPage: number;
  setCurrentPage: (p: number) => void;

  lastPage: number;
  setLastPage: (p: number) => void;

  changePage: boolean;
  setChangePage: (v: boolean) => void;

  loading: boolean;
  socket: any | null;

  setTargetPage: (p: number) => void;
  setTargetStatus: (s: number) => void;
};

const TargetContext = createContext<TargetContextValue | undefined>(undefined);

export function TargetProvider({ children }: { children: ReactNode }) {
  const [targetId, setTargetId] = useState<string | null>(null);
  const [targetData, setTargetData] = useState<TargetResponse | null>(null);

  const [codesId, setCodesId] = useState<CodeResponse | null>(null);
  const [codesData, setCodesData] = useState<CodeResponse | null>(null);
  const [codeStatus, setCodeStatus] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(0);
  const [changePage, setChangePage] = useState<boolean>(true);

  const [loading] = useState<boolean>(false);

  // Conecta e registra listeners só uma vez
  useEffect(() => {
    if (!socket) return;

    // quando chega atualização de página (emitido pelo backend via player)
    onPageUpdate((data: PageUpdateDto) => {
      setLastPage((p) => p ?? currentPage);
      setCurrentPage(data.page);
      if (targetData) {
        setTargetData({ ...targetData, page: data.page });
      }
    });

    // cleanup
    return () => {
      socket.off("pageUpdated");
    };
  }, [currentPage, targetData]);

  // sempre que targetId mudar, manda enterTarget
  useEffect(() => {
    if (targetId) {
      enterTarget({
        targetId,
        name: targetData?.name ?? "guest",
        info: targetData?.info ?? "",
      });
    }
  }, [targetId, targetData?.name, targetData?.info]);

  // helpers
  const setTargetPage = (p: number) => {
    setLastPage((prev) => prev ?? currentPage);
    setCurrentPage(p);
    if (targetData) {
      setTargetData({ ...targetData, page: p });
    }
  };

  const setTargetStatus = (s: number) => {
    if (targetData) {
      setTargetData({ ...targetData, status: s });
    }
  };

  const value: TargetContextValue = {
    targetId,
    setTargetId,

    targetData,
    setTargetData,

    currentPage,
    setCurrentPage,

    lastPage,
    setLastPage,

    changePage,
    setChangePage,

    loading,
    socket,

    setTargetPage,
    setTargetStatus,
  };

  return (
    <TargetContext.Provider value={value}>
      {children}
    </TargetContext.Provider>
  );
}

export function useTarget() {
  const ctx = useContext(TargetContext);
  if (!ctx) throw new Error("useTarget must be used inside TargetProvider");
  return ctx;
}
