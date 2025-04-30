import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../constants/key';

export const axiosMovieInstance = axios.create({
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
    },
});

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem(
            LOCAL_STORAGE_KEY.accessToken,
        )}`,
    },
});
