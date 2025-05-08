import axios, { InternalAxiosRequestConfig } from 'axios';
import { tokenStorage } from '../utils/tokenStorage';
import { API_AUTH } from '../constants/api';
import ROUTES from '../constants/routes';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;

const baseConfig = {
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    withCredentials: true,
};

export const publicAxios = axios.create({ ...baseConfig });
export const privateAxios = axios.create({ ...baseConfig });

privateAxios.interceptors.request.use(
    (config) => {
        const token = tokenStorage.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

privateAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest: CustomInternalAxiosRequestConfig = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            if (originalRequest.url === API_AUTH.REFRESH_TOKEN) {
                tokenStorage.clear();
                window.location.href = ROUTES.LOGIN;
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            if (!refreshPromise) {
                refreshPromise = (async () => {
                    const refreshToken = tokenStorage.getRefreshToken();

                    const { data } = await privateAxios.post(
                        API_AUTH.REFRESH_TOKEN,
                        {
                            refresh: refreshToken,
                        },
                    );

                    tokenStorage.setAccessToken(data.data.accessToken);
                    tokenStorage.setRefreshToken(data.data.refreshToken);

                    return data.data.accessToken;
                })()
                    .catch(() => {
                        tokenStorage.clear();
                        window.location.href = ROUTES.LOGIN;
                        return null;
                    })
                    .finally(() => {
                        refreshPromise = null;
                    });
            }

            return refreshPromise.then((newAccessToken) => {
                if (!newAccessToken) return Promise.reject(error);

                originalRequest.headers['Authorization'] =
                    `Bearer ${newAccessToken}`;
                return privateAxios.request(originalRequest);
            });
        }

        return Promise.reject(error);
    },
);
