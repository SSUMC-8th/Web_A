import { ResponseCommentListDto } from "../types/comment";
import { CommentPageDto, PageDto } from "../types/common";
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

// //getComment.ts
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
