import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { playerLogin, getPlayer, updatePlayer, getPlayers } from "../fetchs/player.fetch";
import { Player } from "../rules/domain/player";

type PlayerContextType = {
  player: Player | null;
  loading: boolean;
  loginPlayer: (username: string, password: string) => Promise<void>;
  fetchPlayer: (id: string) => Promise<void>;
  updatePlayerInfo: (id: string, data: Partial<Player>) => Promise<void>;
  logout: () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(false);

  const loginPlayer = async (username: string, password: string) => {
    setLoading(true);
    try {
      const data = await playerLogin(username, password);
      setPlayer(data);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayer = async (id: string) => {
    setLoading(true);
    try {
      const data = await getPlayer(id);
      setPlayer(data);
    } finally {
      setLoading(false);
    }
  };

  const updatePlayerInfo = async (id: string, data: Partial<Player>) => {
    setLoading(true);
    try {
      const updated = await updatePlayer(id, data);
      setPlayer(updated);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setPlayer(null);
  };

  return (
    <PlayerContext.Provider
      value={{ player, loading, loginPlayer, fetchPlayer, updatePlayerInfo, logout }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used inside PlayerProvider");
  }
  return context;
}


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