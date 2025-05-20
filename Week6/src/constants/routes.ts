const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  MYPAGE: '/my',
  SEARCH: '/search',
  LP_DETAIL: (id: string | number = ':lpId') => `/lp/${id}`,
};

export default ROUTES;
