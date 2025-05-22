import { API_LPS } from '#/constants/api';
import { SortOrder } from '#/constants/sort';
import {
  RequestGetLpDto,
  RequestPostLpDto,
  RequestpatchLpDetailDto,
  ResponseGetLpDetailDto,
  ResponseGetLpDto,
  ResponsePatchLpDetailDto,
  ResponsePostLpDto,
} from '#/types/lps';

import { privateAxios, publicAxios } from './axiosInstance';

export const getLp = async ({
  cursor = null,
  limit = 12,
  search = '',
  order = SortOrder.LATEST,
}: RequestGetLpDto): Promise<ResponseGetLpDto> => {
  const { data } = await publicAxios.get(API_LPS.LIST, {
    params: {
      cursor,
      limit,
      search,
      order,
    },
  });
  return data;
};

export const postLp = async ({
  title,
  content,
  thumbnail,
  tags,
  published = true,
}: RequestPostLpDto): Promise<ResponsePostLpDto> => {
  const { data } = await privateAxios.post(API_LPS.CREATE, {
    title,
    content,
    thumbnail,
    tags,
    published,
  });

  return data;
};

export const getLpDetail = async (
  lpId: number,
): Promise<ResponseGetLpDetailDto> => {
  const { data } = await publicAxios.get(API_LPS.DETAIL(lpId));
  return data;
};

export const patchLpDetail = async ({
  lpId,
  title,
  content,
  thumbnail,
  tags,
  published = true,
}: RequestpatchLpDetailDto): Promise<ResponsePatchLpDetailDto> => {
  const { data } = await privateAxios.patch(API_LPS.UPDATE(lpId), {
    title,
    content,
    thumbnail,
    tags,
    published,
  });

  return data;
};

export const deleteLp = async (lpId: number): Promise<void> => {
  const { data } = await privateAxios.delete(API_LPS.DELETE(lpId));
  return data;
};
