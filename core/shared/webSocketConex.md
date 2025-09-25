# Conexão WebSocket - Fluxo de Negócio

Este documento descreve como funciona a comunicação via WebSocket entre os diferentes módulos do sistema: **Front End do Target (Client)**, **Front End do Player (Operador)** e **Back End (Server)**.

---

## 1. Objetivo

O objetivo deste fluxo é permitir que:

1. O **Target** (usuário do cliente) entre em uma sessão específica.
2. O **Player** (operador) acompanhe e controle o status e a página do Target em tempo real.
3. O **Server** centralize e distribua os eventos de atualização entre os participantes conectados.

---

## 2. Arquitetura e Papéis

| Componente | Papel |
|------------|------|
| **Target (Client)** | Cliente final que entra em uma sessão (`targetId`) e recebe atualizações de status e página. |
| **Player (Operador)** | Operador que observa e controla o Target, enviando atualizações de página ou comandos. |
| **Server (Back End)** | Gateway central que gerencia as salas (`rooms`) e repassa eventos entre Target e Player. |

---

## 3. Fluxo de Conexão

### 3.1 Target (Client)

- Conecta-se ao WebSocket do server.
- Entra na **sala** do `targetId` com o evento `joinTarget`.
- Escuta eventos do servidor:
  - `targetEntered` → Notifica que um Target entrou na sala.
  - `targetStatusInit` → Recebe o status inicial autorizado.
  - `targetPageUpdated` → Recebe a página que o Target pode acessar.

Exemplo (simplificado):

```ts
const socket = connectTargetSocket(targetId);
socket.emit("joinTarget", targetId);

socket.on("targetEntered", (data) => console.log(data));
socket.on("targetStatusInit", (data) => console.log(data));
socket.on("targetPageUpdated", (data) => console.log(data.page));
