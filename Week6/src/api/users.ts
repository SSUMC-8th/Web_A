import { ResponseMyInfoDto } from "../types/auth";
import axiosInstance from "./axios-instance";

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/users/me");

  return data;
};
