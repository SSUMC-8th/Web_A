import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hook/useLocalStorage";

// request에 config라는 속성이 있다.
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // 요청을 재시도 여부를 나타내는 플래그
}

// 전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지한다.
let refreshPromise: Promise<string> | null = null;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// 요청 인터셉터: 모든 요청 전에 accessToeken을 Authorization 헤더에 추가한다.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

    // accessToken이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 추가한다.
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }

    // 수정된 요청 설정을 반환한다.
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러가 발생 -> refresh 토큰을 통한 토큰 갱신을 처리합니다.

axiosInstance.interceptors.response.use(
  (response) => response, //
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;
    // 401 에러면서, 아직 재시도 하지 않은 요청 경우 처리
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
      // 만약 커스텀한 에러를 사용하고 있다면, 아래와 같이 추가할 수 있습니다.
      // error.reponse.errorCode === "AUTH_001" && error.response.errorCode === "TokenExpired"
      // 이런 느낌으로도 가능하다
    ) {
      // refresh 엔드포인트 401 에러가 발생한 경우 (Unauthorized), 중복 재시도 방지를 위해 로그아웃 처리
      if (originalRequest.url === "/auth/refresh") {
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
      }
      // 재시도 플래그 설정 ( 무한 루프 방지 )
      originalRequest._retry = true;

      // 이미 refresh 요청이 진행중이면, 그 Promise를 재사용합니다.
      if (!refreshPromise) {
        // refresh 요청 실행 후, 프로미스를 전역 변수에 할당.
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          const refreshToken = getRefreshToken();

          const { data } = await axiosInstance.post("/auth/refresh", {
            refresh: refreshToken,
          });
          // 새 토큰이 반환
          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          // 새 AccessToken을 반환하여 다른 요청들이 이것을 사용할 수 있게 함.
          return data.data.accessToken;
        })()
          .catch((error) => {
            // refresh 요청 실패 시, localStorage에서 토큰 제거 후 로그아웃 처리
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
            // refresh 요청이 끝나면, refreshPromise를 null로 초기화
            refreshPromise = null;
          });
      }
      // 진행중인 refreshPromise가 해결될 때까지 기다림
      return refreshPromise.then((newAccessToken) => {
        // 원본 요청의 Authorization 헤더를 새 AccessToken으로 업데이트
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // 업데이트 된 원본 요청을 재시도합니다.
        return axiosInstance(originalRequest);
      });
    }
    // 401 에러가 아닌 경우, 원본 에러를 그대로 반환
    return Promise.reject(error);
  }
);

export default axiosInstance;
