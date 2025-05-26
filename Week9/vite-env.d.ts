/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TMDB_KEY: string;
    readonly VITE_TMDB_URL_POPULAR: string;
    readonly VITE_TMDB_URL_UPCOMING: string;
    readonly VITE_TMDB_URL_TOPRATED: string;
    readonly VITE_TMDB_URL_NOWPLAYING: string;
    readonly VITE_SERVER_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
