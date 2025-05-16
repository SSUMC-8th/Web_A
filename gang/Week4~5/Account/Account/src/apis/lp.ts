import { RequestCreateLpDto, ResponseCreateLpDto } from "../types/auth";
import {
  CommentDetail,
  RequestCommentDto,
  RequestPatchCommentDto,
  ResponseLpCommentDto,
  useCommentProps,
} from "../types/comment";
import { LpCommentParams, LpParams } from "../types/common";
import {
  LpId,
  LpListResponse,
  RequestLPDetailDto,
  ResponseLpDetailDto,
  UpdateLpsDto,
} from "../types/lptype";
import { axiosInstance } from "./axios";

export const getLpList = async (lpParams: LpParams) => {
  const { data } = await axiosInstance.get("/v1/lps", { params: lpParams });
  return data;
};

export const getMyLpList = async (
  lpParams: LpParams
): Promise<LpListResponse> => {
  const { data } = await axiosInstance.get("/v1/lps/user", {
    params: lpParams,
  });
  console.log(data);
  return data;
};

export const getLpDetail = async ({
  lpId,
}: RequestLPDetailDto): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  console.log(data);
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
  return data;
};

export const getLpComment = async (commentParams: LpCommentParams) => {
  const { data } = await axiosInstance.get(
    `/v1/lps/${commentParams.lpId}/comments`
  );
  return data;
};
export const patchLpComment = async ({
  lpId,
  commentId,
  content,
}: RequestPatchCommentDto): Promise<ResponseLpCommentDto> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { content }
  );
  console.log(data);
  return data;
};

export const deleteLpComment = async ({
  commentId,
  lpId,
}: useCommentProps): Promise<ResponseLpCommentDto> => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  console.log(data);
  return data;
};

export const patchLps = async (
  lpId: LpId,
  body: UpdateLpsDto
): Promise<ResponseLpDetailDto> => {
  console.log("📦 PATCH 요청 본문:", body);
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, body);
  console.log(data);
  return data;
};

export const deleteLps = async (lpId: LpId) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  console.log(data);
  return data;
};
