/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_RAWG_API_KEY: string
    readonly VITE_APP_BASE_URI: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}