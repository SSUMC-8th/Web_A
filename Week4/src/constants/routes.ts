const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    MYPAGE: '/my',

    MOVIE: {
        ROOT: '/movies',
        CATEGORY: (category: string) => `/movies/${category}`,
        DETAIL: (id: number | string) => `/movies/detail/${id}`,
    },
};

export default ROUTES;
