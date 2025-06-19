import axios from 'axios';

import { TMDB_AUTH_TOKEN, TMDB_BASE_URL } from '@/constants/api';

const axiosClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: TMDB_AUTH_TOKEN,
  },
});

export default axiosClient;
