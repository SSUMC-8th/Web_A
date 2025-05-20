import { CommenResponse } from "./common";

//회원가입 관련
export type RequesetSignupDto = {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
};

export type ResponseSignupDto = CommenResponse<{
  id: number;
  name: string;
  email: string;
  bio: boolean | null;
  avatar: boolean | null;
  createdAt: string;
  updatedAt: string;
}>;

//로그인관련

export type RequestSigninDto = CommenResponse<{
  email: string;
  password: string;
}>;

export type ResponseSigninDto = CommenResponse<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

export type ResponseMyInfoDto = CommenResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;
