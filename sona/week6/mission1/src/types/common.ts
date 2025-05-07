import { PAGENATION_ORDER } from "../enums/common";

export type CommenResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type CursorBasedResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
  nextCursor: string;
  hasNext: boolean;
};

//lp목록 조회 파라미터
export type PageDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PAGENATION_ORDER;
};
