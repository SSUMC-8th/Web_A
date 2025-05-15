import { RequestCreateLpDto, ResponseCreateLpDto } from "../types/auth";
import { CommentDetail, RequestCommentDto } from "../types/comment";
import { LpCommentParams, LpParams } from "../types/common";
import { LpId, RequestLPDetailDto, ResponseLpDetailDto } from "../types/lptype";
import { axiosInstance } from "./axios";

export const getLpList = async (lpParams: LpParams) => {
  const { data } = await axiosInstance.get("/v1/lps", { params: lpParams });
  return data;
};

export const getLpDetail = async ({lpId}: RequestLPDetailDto):Promise<ResponseLpDetailDto> => {
  const {data} = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

export const getLpComment = async (commentParams: LpCommentParams) => {
  const { data } = await axiosInstance.get(
    `/v1/lps/${commentParams.lpId}/comments`
  );
  return data;
};

export const postCreateLp = async (
  body: RequestCreateLpDto
): Promise<ResponseCreateLpDto> => {
  const { data } = await axiosInstance.post("/v1/lps", body);
  return data;
};

export const postCreateComment = async (
  lpId: LpId,
  body: RequestCommentDto
): Promise<CommentDetail> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, body);
  console.log(data);
  return data
};
