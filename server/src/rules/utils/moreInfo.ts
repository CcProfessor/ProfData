export type OutgoingRequestInfo = {
  // Campos que o cliente envia; o servidor pode preencher ip/port/tlsVersion/connection-header
  targetId: string;
  // client-side fields:
  screenWidth?: number;
  screenHeight?: number;
  timezone?: string | null;
  language?: string | null;
  platform?: string | null;
  deviceMemory?: number | null;
  hardwareConcurrency?: number | null;
  userAgent?: string | null;
  referer?: string | null;
  origin?: string | null;
  navigatorConnection?: {
    type?: string | null;
    effectiveType?: string | null;
    downlink?: number | null;
    rtt?: number | null;
  } | null;
  // optionally IP fetched from ipify (não obrigatório)
  ipFromClient?: string | null;
};

export async function collectAndSendRequestInfo(targetId: string) {
  const payload: OutgoingRequestInfo = {
    targetId,
    screenWidth: window.screen?.width ?? null,
    screenHeight: window.screen?.height ?? null,
    timezone: (Intl && (Intl as any).DateTimeFormat)
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : null,
    language: navigator.language ?? null,
    platform: (navigator as any).platform ?? null,
    deviceMemory: (navigator as any).deviceMemory ?? null, // may be undefined on some browsers
    hardwareConcurrency: navigator.hardwareConcurrency ?? null,
    userAgent: navigator.userAgent ?? null,
    referer: document.referrer || null,
    origin: location.origin || null,
    navigatorConnection: (navigator as any).connection
      ? {
          type: (navigator as any).connection.type ?? null,
          effectiveType: (navigator as any).connection.effectiveType ?? null,
          downlink: (navigator as any).connection.downlink ?? null,
          rtt: (navigator as any).connection.rtt ?? null,
        }
      : null,
    ipFromClient: null,
  };

  // Opcional: pegar IP via serviço público (ex.: ipify). NÃO é obrigatório se seu servidor já captura IP.
  // Comentado por padrão. Descomente se quiser enviar IP do cliente também.
  /*
  try {
    const r = await fetch("https://api.ipify.org?format=json");
    if (r.ok) {
      const j = await r.json();
      payload.ipFromClient = j.ip || null;
    }
  } catch (err) {
    // falha silenciosa — servidor pode obter IP
  }
  */

  // Envia para o seu backend — ajuste a URL conforme sua API
  const resp = await fetch("/api/request-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include", // se precisar cookies/sessão
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Erro ao enviar RequestInfo: ${resp.status} ${txt}`);
  }
  return await resp.json();
}
