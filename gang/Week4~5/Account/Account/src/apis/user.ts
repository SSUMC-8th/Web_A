import { RequestPatchMyInfoDto, ResponseMyInfoDto } from "../types/auth";
import { axiosInstance } from "./axios";

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");
  return data;
};

export const patchMyInfo = async (body: RequestPatchMyInfoDto ):Promise<ResponseMyInfoDto> =>{
    const {data} = await axiosInstance.patch("/v1/users",body);
    console.log(data);
    return data;
}

export const delelteMyInfo = async () =>{
    await axiosInstance.delete("/v1/users")
}