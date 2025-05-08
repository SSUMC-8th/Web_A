const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    MYPAGE: '/my',
    LP_DETAIL: (id: string | number = ':lpId') => `/lp/${id}`,
};

export default ROUTES;
