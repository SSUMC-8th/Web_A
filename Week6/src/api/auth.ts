import {
  RequestSignInDto,
  RequestSignUpDto,
  ResponseSignInDto,
  ResponseSignUpDto,
} from "../types/auth";
import axiosInstance from "./axios-instance";

export const postSignUp = async (
  body: RequestSignUpDto
): Promise<ResponseSignUpDto> => {
  const { data } = await axiosInstance.post("/auth/signup", body);

  return data;
};

export const postSignIn = async (
  body: RequestSignInDto
): Promise<ResponseSignInDto> => {
  const { data } = await axiosInstance.post("/auth/signin", body);

  return data;
};

export const postSignOut = async () => {
  const { data } = await axiosInstance.post("/auth/signout");

  return data;
};
