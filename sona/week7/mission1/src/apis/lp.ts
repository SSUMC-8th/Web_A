import { PageDto } from "../types/common";
import { ResponseLpListDto } from "../types/lp";
import axiosInstance from "./axios";

// getLpList.ts
export const getLpList = async (
  pageDto: PageDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: pageDto,
  });
  return data;
};
