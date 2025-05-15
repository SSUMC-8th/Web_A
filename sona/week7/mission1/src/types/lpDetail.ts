import { Author, CommenResponse } from "./common";
import { Likes, Tag } from "./lp";

export type LpDetail = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string; // 또는 Date, 실제 사용하는 포맷에 맞게
  updatedAt: string;
  tags: Tag[];
  likes: Likes[];
  author: Author;
};

export type LpDetailResponseDto = CommenResponse<LpDetail>;
