type CategoryType = 'popular' | 'upcoming' | 'top-rated' | 'now_playing';

export const urlMap: Record<CategoryType, string> = {
    popular: import.meta.env.VITE_TMDB_URL_POPULAR,
    upcoming: import.meta.env.VITE_TMDB_URL_UPCOMING,
    'top-rated': import.meta.env.VITE_TMDB_URL_TOPRATED,
    now_playing: import.meta.env.VITE_TMDB_URL_NOWPLAYING,
};
