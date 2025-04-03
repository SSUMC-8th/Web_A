import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
  },
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
});

export default axiosInstance;
