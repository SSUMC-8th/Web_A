export const API_AUTH = {
    SIGN_UP: '/v1/auth/signup',
    SIGN_IN: '/v1/auth/signin',
    SIGN_OUT: '/v1/auth/signout',
    REFRESH_TOKEN: '/v1/auth/refresh',
    PROTECTED: '/v1/auth/protected',
    GOOGLE_LOGIN: '/v1/auth/google/login',
    GOOGLE_CALLBACK: '/v1/auth/google/callback',
};

export const API_USERS = {
    GET_ME: '/v1/users/me',
    GET_BY_ID: (userId: string) => `/v1/users/${userId}`,
    DELETE_USER: '/v1/users',
    UPDATE_USER: '/v1/users',
};

export const API_LPS = {
    LIST: '/v1/lps',
    CREATE: '/v1/lps',
    LIST_BY_USER_ID: (userId: string) => `/v1/lps/user/${userId}`,
    LIST_MY: '/v1/lps/user',
    DETAIL: (lpId: number) => `/v1/lps/${lpId}`,
    UPDATE: (lpId: number) => `/v1/lps/${lpId}`,
    DELETE: (lpId: number) => `/v1/lps/${lpId}`,
    LIST_BY_TAG: (tagName: string) => `/v1/lps/tag/${tagName}`,
};

export const API_COMMENTS = {
    LIST: (lpId: number) => `/v1/lps/${lpId}/comments`,
    CREATE: (lpId: number) => `/v1/lps/${lpId}/comments`,
    UPDATE: (lpId: number, commentId: number) =>
        `/v1/lps/${lpId}/comments/${commentId}`,
    DELETE: (lpId: number, commentId: number) =>
        `/v1/lps/${lpId}/comments/${commentId}`,
};

export const API_LIKES = {
    LIKE: (lpId: number) => `/v1/lps/${lpId}/likes`,
    UNLIKE: (lpId: number) => `/v1/lps/${lpId}/likes`,
    LIST_MY_LIKES: '/v1/lps/likes/me',
    LIST_USER_LIKES: (userId: string) => `/v1/lps/likes/${userId}`,
};

export const API_TAGS = {
    LIST: '/v1/tags',
};

export const API_UPLOADS = {
    PRIVATE_UPLOAD: '/v1/uploads',
    PUBLIC_UPLOAD: '/v1/uploads/public',
};
