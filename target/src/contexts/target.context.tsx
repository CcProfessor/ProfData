import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { enterTarget, onPageUpdate, sendCodeResponse } from "../target-socket";
import { TargetResponse } from "../rules/interfaces/target.interfaces";

/**
 * Context for Target (client app)
 *
 * - targetId: id atual (vindo da URL ou setado)
 * - targetData: instância do target (TargetResponse)
 * - lastPage / currentPage / changePage: navegação local
 * - socket: instancia do socket.io-client
 * - helpers: setTargetId, setCurrentPage, setTargetPage (altera instância local), etc.
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

  // convenience
  setTargetPage: (p: number) => void;
  setTargetStatus: (s: number) => void;
};

const TargetContext = createContext<TargetContextValue | undefined>(undefined);

export function TargetProvider({ children }: { children: ReactNode }) {
  const [targetId, setTargetId] = useState<string | null>(null);
  const [targetData, setTargetData] = useState<TargetResponse | null>(null);

  const [codes, setCodes] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(0);
  const [changePage, setChangePage] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [socket, setSocket] = useState<any | null>(null);

  // Connect socket when targetId is set
  useEffect(() => {
    if (!targetId) {
      // disconnect existing socket if any
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    // connect
    const sock = connectTargetSocket(targetId);
    setSocket(sock);

    // Listen socket events and update targetData / pages accordingly
    sock.on("targetStatusInit", (data: any) => {
      // server emits success boolean OR { success: boolean } or { status: number } depending
      // We accept both forms
      const status =
        typeof data === "object" && data !== null && data.status !== undefined
          ? data.status
          : typeof data === "object" && data !== null && data.success !== undefined
          ? data.success
            ? 1
            : 2
          : typeof data === "boolean"
          ? data
            ? 1
            : 2
          : undefined;

      if (status !== undefined && targetData) {
        setTargetData({ ...targetData, status });
      }
    });

    sock.on("targetPageUpdated", (data: any) => {
      // expects { page: number } or number
      const page =
        typeof data === "object" && data !== null && data.page !== undefined
          ? data.page
          : typeof data === "number"
          ? data
          : undefined;

      if (page !== undefined) {
        setLastPage((p) => p ?? currentPage);
        setCurrentPage(page);
        // sync with instance if exists
        if (targetData) {
          setTargetData({ ...targetData, page });
        }
      }
    });

    // optionally, server might emit a full target object on connect/enter
    sock.on("targetEntered", (payload: any) => {
      if (payload && payload.target) {
        setTargetData(payload.target as TargetResponse);
        if ((payload.target as any).page !== undefined) {
          setCurrentPage((payload.target as any).page);
        }
      } else if (payload && payload.targetId) {
        // nothing much - keep id
      }
    });

    return () => {
      try {
        sock.off("targetStatusInit");
        sock.off("targetPageUpdated");
        sock.off("targetEntered");
        sock.disconnect();
      } catch (e) {
        /* ignore */
      }
      setSocket(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetId]);

  // helpers to update instance's page/status locally
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

  return <TargetContext.Provider value={value}>{children}</TargetContext.Provider>;
}

export function useTarget() {
  const ctx = useContext(TargetContext);
  if (!ctx) throw new Error("useTarget must be used inside TargetProvider");
  return ctx;
}
