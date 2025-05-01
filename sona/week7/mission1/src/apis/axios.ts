import axios, { InternalAxiosRequestConfig } from "axios";
import useLocalStorage from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});
//요청 인터셉터
//모든 요청 전에 accessToken을 Authorization 헤더에 추가한다.
axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accesstoken = getItem();
    //accessToken이 존재하면 authorizatoin 헤더에 bearer토큰 형식으로 추가한다.
    if (accesstoken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    return config;
  },
  //요청 인터셉터가 실패하면 에러
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (e) => {
    const originalRequest: CustomInternalAxiosRequestConfig = e.config;

    if (e.response && e.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // refresh 실패 =>로그아웃,
      if (originalRequest.url === "/v1/auth/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken
        );
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(e);
      }

      if (!refreshPromise) {
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          const refreshToken = getRefreshToken();

          if (!refreshToken) {
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            removeAccessToken();
            removeRefreshToken();
            window.location.href = "/login";
            throw new Error("No refresh token");
          }

          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });

          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );

          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          return data.data.accessToken;
        })()
          .catch((error) => {
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            removeAccessToken();
            removeRefreshToken();
            window.location.href = "/login";
            return Promise.reject(error);
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      return refreshPromise.then((newAccessToken) => {
        originalRequest.headers["Authorization"] = `Bearer${newAccessToken}`;
        return axiosInstance.request(originalRequest);
      });
    }

    return Promise.reject(e);
  }
);

export default axiosInstance;
