const RoutePaths = Object.freeze({
  MAIN: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  MYPAGE: "/my",
  SEARCH: "/search",
  DETAIL: "/lp/:lpId",
  GOOGLE_LOGIN: `${import.meta.env.VITE_SERVER_API_URL}/auth/google/login`,
  GOOGLE_REDIRECT: `/v1/auth/google/redirect`,
  // 기존 VITE_SERVER_API_URL 사용하지 않기때문에, v1까지 붙여줘야한다.
  GOOGLE_CALLBACK: `/v1/auth/google/callback`,
  THROTTLE: "/throttle",
});

export default RoutePaths;
