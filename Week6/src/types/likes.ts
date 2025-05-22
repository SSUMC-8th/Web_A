import { CommonResponse } from './common';

export type ResponsePostLikeDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type ResponseDeleteLikeDto = ResponsePostLikeDto;
