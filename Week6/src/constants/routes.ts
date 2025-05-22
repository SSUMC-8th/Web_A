import { publicAxios } from '@/apis/axiosInstance';

import { API_UPLOADS } from './api';

const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  MYPAGE: '/my',
  SEARCH: '/search',
  LP_DETAIL: (id: string | number = ':lpId') => `/lp/${id}`,
};

export default ROUTES;
export const postImagePublic = async () => {
  const { data } = await publicAxios.post(API_UPLOADS.PUBLIC_UPLOAD);

  return data;
};
