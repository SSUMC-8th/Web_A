import { CommonResponse } from './common';

export type UserInfo = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ResponseGetUsersDto = CommonResponse<UserInfo>;

export type RequestPatchUsersDto = {
  name: string;
  bio: string | null;
  avatar: string | null;
};

export type ResponsePatchUsersDto = CommonResponse<UserInfo>;
