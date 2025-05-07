import { PaginationDto } from "../../types/common";
import { ResponseLpListDto } from "../../types/lp";
import axiosInstance from "../axios-instance";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/lps", {
    params: paginationDto,
  });

  return data;
};
