import {
  RequestPatchUsersDto,
  ResponseGetUsersDto,
  ResponsePatchUsersDto,
} from '@/types/users';

import { API_USERS } from '../constants/api';
import { privateAxios } from './axiosInstance';

export const getUsers = async (): Promise<ResponseGetUsersDto> => {
  const { data } = await privateAxios.get(API_USERS.GET_ME);
  return data;
};

export const deleteUsers = async (): Promise<void> => {
  await privateAxios.delete(API_USERS.DELETE_USER);
};

export const patchUsers = async (
  body: RequestPatchUsersDto,
): Promise<ResponsePatchUsersDto> => {
  const { data } = await privateAxios.patch(API_USERS.UPDATE_USER, body);
  return data;
};
