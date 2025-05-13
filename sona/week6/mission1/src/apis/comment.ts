import { ResponseCommentListDto } from "../types/comment";
import { CommentPageDto } from "../types/common";
import axiosInstance from "./axios";

// getCommentList.ts
export const getCommentList = async (
  params: CommentPageDto
): Promise<ResponseCommentListDto> => {
  const { lpId, ...queryParams } = params;
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: queryParams,
  });
  return data;
};
