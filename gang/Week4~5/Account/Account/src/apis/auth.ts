import {
  RequestLoginDto,
  RequestRegisterDto,
  ResponseLoginDto,
  ResponseMyInfoDto,
  ResponseRegisterDto,
  RequestRefreshDTO,
  ResponseRefreshDTO,
  ResponseLogoutDto,
} from "../types/auth";

import { axiosInstance } from "./axios";

export const postRegister = async (
  body: RequestRegisterDto
): Promise<ResponseRegisterDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);
  return data;
};
export const postLogin = async (
  body: RequestLoginDto
): Promise<ResponseLoginDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);
  return data;
};

export const postLogout = async (): Promise<ResponseLogoutDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signout");
  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");
  return data;
};

export const postRefresh = async (
  body: RequestRefreshDTO
): Promise<ResponseRefreshDTO> => {
  const { data } = await axiosInstance.post("/v1/auth/refresh", body);
  console.log(data);
  return data;
};
