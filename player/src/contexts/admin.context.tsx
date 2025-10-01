import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getPlayers } from "../fetchs/admin.fetch";
import { Player } from "../rules/domain/player";


type PlayerListContextType = {
  players: Player[];
  loading: boolean;
  fetchAllPlayers: () => Promise<void>;
};

const PlayerListContext = createContext<PlayerListContextType | undefined>(undefined);

export function PlayerListProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPlayers = async () => {
    setLoading(true);
    try {
      const data = await getPlayers();
      setPlayers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPlayers(); // já busca automaticamente ao montar
  }, []);

  return (
    <PlayerListContext.Provider value={{ players, loading, fetchAllPlayers }}>
      {children}
    </PlayerListContext.Provider>
  );
}

export function usePlayerList() {
  const context = useContext(PlayerListContext);
  if (!context) {
    throw new Error("usePlayerList must be used inside PlayerListProvider");
  }
  return context;
}