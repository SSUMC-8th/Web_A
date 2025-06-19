export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_AUTH_TOKEN = `Bearer ${import.meta.env.VITE_TMDB_KEY}`;
export const TMDB_API_PATHS = {
  SEARCH_MOVIE: '/search/movie',
} as const;
