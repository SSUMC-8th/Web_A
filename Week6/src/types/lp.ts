import { PAGINATION_ORDER } from "../enums/pagination";
import { CursorBasedResponse } from "./common";

export type Tags = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type LP = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tags[];
  likes: Likes[];
};

export type ResponseLpListDto = CursorBasedResponse<LP[]>;

export type ResponseLpDetailDto = {
  status: boolean;
  message: string;
  statusCode: number;
  data: Data;
};

export interface Data {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
  tags: Tags[];
  likes: Likes[];
}

export interface Author {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}
// 댓글 관련 타입

export type CommentDto = {
  id: number;
  cursor?: number;
  limit?: number;
  order?: PAGINATION_ORDER;
};

export type ResponseLpCommentDto = {
  status: boolean;
  message: string;
  statusCode: number;
  data: commentData;
};

export interface commentData {
  data: commentDetailDto[];
  nextCursor: number;
  hasNext: boolean;
}

export interface commentDetailDto {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export interface commentAuthor {
  id: number;
  name: string;
  email: string;
  bio: null | string;
  avatar: null | string;
  createdAt: string;
  updatedAt: string;
}
