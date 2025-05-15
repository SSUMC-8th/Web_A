import { MutationMeta } from "@tanstack/react-query";
import { PAGENATION_ORDER } from "../enums/common";

export type CommenResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type CursorBasedResponse<T> = CommenResponse<{
  data: T;
  nextCursor: number | null;
  hasNext: boolean;
}>;

//lp목록 조회 파라미터
export type PageDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PAGENATION_ORDER;
};

//comment 목록 조회 파라미터
export type CommentPageDto = {
  lpId: number;
  cursor?: number;
  limit?: number;
  order?: PAGENATION_ORDER;
};

//lp삭제 파라미터
export type LpDeleteDto = {
  lpId: number;
  commentId: number;
};
//commentDto
export type CommentPatchDto = {
  lpId: number;
  commentId: number;
  content: string;
};

//userEditDto
export type UserPatchDto = {
  name: string;
  bio?: string;
  avatar?: string;
};
