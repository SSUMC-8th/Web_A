import axiosInstance from "../axios-instance";
import { PatchLpDto, ResponseLpDto } from "../../types/lp";

export const patchLp = async (
  lpId: number,
  body: PatchLpDto
): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.patch(`/lps/${lpId}`, body);
  return data;
};
