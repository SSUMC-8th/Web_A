import axios from "axios";

export default function useAxiosInstance() {
  const instance = axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  // 요청 인터셉터 추가하기
  instance.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${import.meta.env.VITE_TMDB_KEY}`;
    // // 요청이 전달되기 전에 필요한 공통 작업 수행
    // config.params = {
    //   delay: 500,
    //   ...config.params, // 기존 쿼리스트링 복사
    // };
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      // 2xx 범위에 있는 상태 코드는 이 함수가 호출됨
      // 응답 데이터를 이용해서 필요한 공통 작업 수행

      return response;
    },
    (error) => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리
      console.error("인터셉터", error);
      return Promise.reject(error);
    }
  );

  return instance;
}
