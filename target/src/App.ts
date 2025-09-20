import React, { useEffect, useState } from "react";
import { connectTargetSocket } from "./gateway/socket";

export default function TargetApp({ targetId }: { targetId: string }) {
  const [status, setStatus] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const socket = connectTargetSocket(targetId);

    socket.on("targetStatusInit", (data) => {
      setStatus(data.status);
    });

    socket.on("targetPageUpdated", (data) => {
      setPage(data.page);
    });

    return () => socket.disconnect();
  }, [targetId]);

  return (
    <div>
      <h1>Target Client</h1>
      <p><b>Status:</b> {status}</p>
      <p><b>Página atual:</b> {page}</p>

      {page === 1 && <div>Página inicial</div>}
      {page === 2 && <div>Carregando...</div>}
      {page === 3 && <div>Requisição em andamento</div>}
      {page === 4 && <div>Acesso liberado!</div>}
    </div>
  );
}
