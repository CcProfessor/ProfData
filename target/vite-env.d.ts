interface ImportMetaEnv {
  readonly VITE_T_BASE_URL: string
  readonly VITE_SERVER_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
