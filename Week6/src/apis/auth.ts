import { API_AUTH } from '@constants/api';

import {
  RequestSigninDto,
  RequestSignupDto,
  ResponseSigninDto,
  ResponseSignupDto,
} from '@/types/auth';

import { privateAxios, publicAxios } from './axiosInstance';

export const postSignup = async (
  body: RequestSignupDto,
): Promise<ResponseSignupDto> => {
  const { data } = await publicAxios.post(API_AUTH.SIGN_UP, body);

  return data;
};

export const postSignin = async (
  body: RequestSigninDto,
): Promise<ResponseSigninDto> => {
  const { data } = await publicAxios.post(API_AUTH.SIGN_IN, body);

  return data;
};

export const postLogout = async () => {
  const { data } = await privateAxios.post(API_AUTH.SIGN_OUT);

  return data;
};
