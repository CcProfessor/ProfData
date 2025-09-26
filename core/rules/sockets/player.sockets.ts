import { io, Socket } from "socket.io-client";
import {
  PlayerSocketEvents,
  TargetSocketEvents,
  EnterTargetDto,
  SendResponseDto,
  CodeResponseDto,
  PageUpdateDto,
  Letter,
} from "../interfaces/gateway.interface";


export function PlayerEmitTarget(event: any, data: any) {
  const socket: Socket = io("http://localhost:3000");
  socket.emit(event, data, () => {
    const { letter } = data;
    const itens: object = {};
    if (event === PlayerSocketEvents.EnterTarget) {
      const { targetId, name, info } = data;
      const infos: EnterTargetDto = {
        targetId, name, info
      }
      return { letter, infos };
    }
    if (event === PlayerSocketEvents.UpdatePage) {
      const { targetId, page, status } = data;
      const pageInfo: PageUpdateDto = {
        targetId,
        page,
        status: status ?? null, 
      };
      return { letter, pageInfo };
    }
    if (event === PlayerSocketEvents.CodeResponse) {
      const { targetId, codeId, codev } = data;
      const infos: CodeResponseDto = {
        targetId, codeId, codev
      }
      return { letter, infos };
    }
    if (event === PlayerSocketEvents.SendResponse) {
      const { targetId, manyInfos } = data;
      const infos: SendResponseDto = {
        targetId, manyInfos
      }
      return { letter, infos };
    }
  });
}

export function PlayerOnTarget(event: any, callback: any) {
  const socket: Socket = io("http://localhost:3000");
  socket.on(event, (data: any, letter: Letter) => {
    if (event === PlayerSocketEvents.UpdatePage) {
      console.log("Player atualizou a página:", data);
      const { targetId, status, page } = data as PageUpdateDto;
      return callback({ targetId, status, page, letter });
    }
    if (event === PlayerSocketEvents.CodeResponse) {
      console.log("Resposta de código:", data);
      const { targetId, codeId, codev } = data as CodeResponseDto;
      return callback({ targetId, codeId, codev, letter });
    }
  });
}


//  ====
 



export function connectPlayerSocket(playerId: string) {
  const socket: Socket = io("http://localhost:3000");

  const letterA = { Remetente: 1, Destino: 2, Middle: false };

  // 🔹 Emite inscrição do player
  socket.emit(PlayerSocketEvents.SubscribePlayer, playerId, () => {
    return { playerId, letterA };
  });

  // 🔹 Escuta quando um target entra
  socket.on(PlayerSocketEvents.EnterTarget, (data) => {
    console.log("Target entrou:", data);
    const { targetId } = data;
    return { targetId, letterA };
  });

  // 🔹 Escuta mudanças de página (atualizações rápidas do target)
  socket.on(PlayerSocketEvents.FastPageUpdate, (data) => {
    console.log("Fast Page Update recebido:", data);
    const { targetId, page, status } = data;
    return { targetId, page, status, letterA };
  });

  // 🔹 Escuta atualização de página enviada pelo player
  socket.on(PlayerSocketEvents.UpdatePage, (data) => {
    console.log("Página atualizada pelo player:", data);
    const { targetId, page, status } = data;
    return { targetId, page, status, letterA };
  });

  // 🔹 Escuta respostas de códigos
  socket.on(PlayerSocketEvents.CodeResponse, (data) => {
    console.log("Code response recebido:", data);
    const { targetId, codeId, codev } = data;
    return { targetId, codeId, codev, letterA };
  });

  // 🔹 Escuta respostas aleatórias
  socket.on(PlayerSocketEvents.SendResponse, (data) => {
    console.log("Resposta aleatória recebida:", data);
    const { targetId, manyInfos } = data;
    return { targetId, manyInfos, letterA };
  });

  return socket;
}
