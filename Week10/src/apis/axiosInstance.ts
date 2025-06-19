import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
  baseURL: import.meta.env.VITE_BASE_URL,
});
