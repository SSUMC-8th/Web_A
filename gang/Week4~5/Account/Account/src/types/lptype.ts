import { CommonResponse, CursorBasedResponse } from "./common";

export type LpListResponse = CursorBasedResponse<Lp[]>;

export type LpId = number;

export type RequestLPDetailDto = {
  lpId: number;
};

export type ResponseLpDetailDto = CommonResponse<Lp>;

export type Lp = {
  id: number;
  title: string;  
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tags[];
  likes: Likes[];
};

export type Tags = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type UpdateLpsDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};
