import { API_COMMENTS } from '#/constants/api';
import { SortOrder } from '#/constants/sort';
import {
  RequestDeleteCommentDto,
  RequestGetCommentsDto,
  RequestPatchCommentDto,
  RequestPostCommentDto,
  ResponseDeleteCommentDto,
  ResponseGetCommentsDto,
  ResponsePatchCommentDto,
  ResponsePostCommentDto,
} from '#/types/comments';

import { privateAxios } from './axiosInstance';

export const getComments = async ({
  lpId,
  cursor = null,
  limit = 10,
  order = SortOrder.LATEST,
}: RequestGetCommentsDto): Promise<ResponseGetCommentsDto> => {
  const { data } = await privateAxios.get(API_COMMENTS.LIST(lpId), {
    params: { cursor, limit, order },
  });
  return data;
};

export const postComment = async ({
  lpId,
  content,
}: RequestPostCommentDto): Promise<ResponsePostCommentDto> => {
  const { data } = await privateAxios.post(API_COMMENTS.CREATE(lpId), {
    content,
  });
  return data;
};

export const patchComment = async ({
  lpId,
  commentId,
  content,
}: RequestPatchCommentDto): Promise<ResponsePatchCommentDto> => {
  const { data } = await privateAxios.patch(
    API_COMMENTS.UPDATE(lpId, commentId),
    { content },
  );
  return data;
};

export const deleteComment = async ({
  lpId,
  commentId,
}: RequestDeleteCommentDto): Promise<ResponseDeleteCommentDto> => {
  const { data } = await privateAxios.delete(
    API_COMMENTS.DELETE(lpId, commentId),
  );

  return data;
};
