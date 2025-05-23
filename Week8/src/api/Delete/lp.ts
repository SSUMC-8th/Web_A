import {
  RequestLpDto,
  ResponseDeleteLp,
  ResponseLikeLpDto,
} from "../../types/lp";
import axiosInstance from "../axios-instance";

export const deleteLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/lps/${lpId}/likes`);
  return data;
};

export const deleteLp = async ({
  lpId,
}: RequestLpDto): Promise<ResponseDeleteLp> => {
  const { data } = await axiosInstance.delete(`/lps/${lpId}`);

  return data;
};
