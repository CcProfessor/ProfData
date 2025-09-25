interface ImportMetaEnv {
  readonly VITE_P_BASE_URL: string
  readonly VITE_SERVER_URL: string
  readonly VITE_T_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
