import { SortOrder } from '@/constants/sort';

import { CommonResponse } from './common';

export type LpItem = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;

  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    avatar: string | null;
  };
  tags: [
    {
      id: number;
      name: string;
    },
  ];
  likes: [
    {
      id: number;
      userId: number;
      lpId: number;
    },
  ];
};

export type RequestGetLpDto = {
  cursor?: number | null;
  limit?: number;
  search?: string | undefined | null;
  order?: SortOrder.LATEST | SortOrder.OLDEST;
};

export type ResponseGetLpDto = CommonResponse<{
  data: LpItem[];
  nextCursor: number | null;
  hasNext: number | null;
}>;

export type RequestPostLpDto = {
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  published?: boolean;
};

export type ResponsePostLpDto = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}>;

export type ResponseGetLpDetailDto = CommonResponse<LpItem>;

export type RequestpatchLpDetailDto = RequestPostLpDto & {
  lpId: number;
};

export type ResponsePatchLpDetailDto = CommonResponse<
  Omit<LpItem, 'author'> & { authorId: number }
>;
