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

  return socket;
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

  return socket;
}


