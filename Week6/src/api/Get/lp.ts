import { PaginationDto } from "../../types/common";
import {
  CommentDto,
  ResponseLpCommentDto,
  ResponseLpDetailDto,
  ResponseLpListDto,
} from "../../types/lp";
import axiosInstance from "../axios-instance";

// LP 목록 조회
export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/lps", {
    params: paginationDto,
  });

  return data;
};

// LP 상세 조회
export const getLpDetail = async (id: number): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/lps/${id}`);
  return data;
};

// 댓글 목록 조회
export const getLpComments = async (
  commentDto: CommentDto
): Promise<ResponseLpCommentDto> => {
  const { data } = await axiosInstance.get(`/lps/${commentDto.id}/comments`, {
    params: commentDto,
  });

  return data;
};
