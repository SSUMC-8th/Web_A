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
