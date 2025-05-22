import { SortOrder } from '#/constants/sort';

import { CommonResponse } from './common';

export type RequestGetCommentsDto = {
  lpId: number;
  cursor?: number | null;
  limit?: number;
  order?: SortOrder.LATEST | SortOrder.OLDEST;
};

export type CommentItem = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
};

export type ResponseGetCommentsDto = CommonResponse<{
  data: CommentItem[];
  nextCursor: number | null;
  hasNext: boolean;
}>;

export type RequestPostCommentDto = {
  lpId: number;
  content: string;
};

export type ResponsePostCommentDto = CommonResponse<{
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}>;

export type RequestPatchCommentDto = {
  lpId: number;
  commentId: number;
  content: string;
};

export type ResponsePatchCommentDto = CommonResponse<{
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}>;

export type RequestDeleteCommentDto = {
  lpId: number;
  commentId: number;
};

export type ResponseDeleteCommentDto = CommonResponse<{
  message: string;
}>;
