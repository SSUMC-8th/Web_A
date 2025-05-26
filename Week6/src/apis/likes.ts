import { API_LIKES } from '@/constants/api';
import { ResponseDeleteLikeDto, ResponsePostLikeDto } from '@/types/likes';

import { privateAxios } from './axiosInstance';

export const postLike = async (lpId: number): Promise<ResponsePostLikeDto> => {
  const { data } = await privateAxios.post(API_LIKES.LIKE(lpId));
  return data;
};

export const deleteLike = async (
  lpId: number,
): Promise<ResponseDeleteLikeDto> => {
  const { data } = await privateAxios.delete(API_LIKES.UNLIKE(lpId));
  return data;
};
