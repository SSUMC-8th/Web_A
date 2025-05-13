import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useLocalStorage from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;//요청 재시도 여부를 나타내는 플래그
}
//전역변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지한다
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

//요청 인터셉터: 모든 요청 전에 accessToken을 Authorization 헤더에 추가한다.
  axiosInstance.interceptors.request.use(
  (config) => {
    const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();//localStorage에서 accessToken을 가져온다.

    //accessToken이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 추가한다.
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    //수정된 요청 설정을 반환한다. 
    return config;
  },

  //요청 인터셉터가 실패하면 에러를 뿜어준다.
  (error) => Promise.reject(error)
);

//응답 인터셉터 에러 401 발생 -> refresh 토큰을 통한 갱신을 처리합니다.
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    //에러 안에 들어있는 원본 요청을 받아온다. 
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    //401 에러면서, 아직 재시도 하지 않은 요청 경우 처리.
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {

      //refresh 엔드포인트 401에러가 발생한 경우 (Unauthorized), 중복 재시도 방지를 위해 로그아웃 처리.
      if (originalRequest.url === "/v1/auth/refresh") {
        const {removeItem:removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const {removeItem:removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }
      //재시도 플래그 설정
      originalRequest._retry = true;

      //이미 refresh 요청이 진행중이면, 그 Promise를 재사용합니다. 처음엔 null이지만 요청이 많아지면 특정 값이 들어있음.
      //따라서 이미 진행중인 요청이 완료될 때까지 비동기를 통해 기다리고 진행.
      if (!refreshPromise) {
        //refresh 요청 실행 후, Promise를 전역변수에 할당.
        refreshPromise = (async () => {
          const {getItem:getRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

          const refreshToken = getRefreshToken();

          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });
          //새 토큰이 반환
          const {setItem:setAccessToken}= useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
          const {setItem:setRefreshToken}= useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);
          //새 accessToken을 반환하여 다른 요청들이 이것을 사용할 수 있게 함.
          return data.data.accessToken;
        })()
          .catch((error) => {
            const {removeItem:removeAccessToken}= useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            const {removeItem:removeRefreshToken}= useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
            removeAccessToken();
            removeRefreshToken();
          })
          .finally(() => {
            refreshPromise = null;
          });
      }
      //진행중인 refreshPromise가 해결될 때까지 기다림
      return refreshPromise.then((newAccessToken) => {
        //원본 요청의 Authorization 헤더를 갱신된 토큰으로 업뎃
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        //업데이트 된 원본 요청을 재시도 합니다.
        return axiosInstance.request(originalRequest);
      });
    }
    //401 에러가 아닌 경우 그대로 오류 반환환
    return Promise.reject(error);
  }
);
