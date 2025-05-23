import { PatchMyInfoDto, ResponseMyInfoDto } from "../../types/auth";
import axiosInstance from "../axios-instance";

export const patchMyInfo = async (
  patchMyInfo: PatchMyInfoDto
): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.patch(`/users`, patchMyInfo);

  return data;
};
