import { CommonResponse } from "./common"

export type RequestRegisterDto = {
    name: string,
    email: string
    bio?: string,
    avatar?: string,
    password: string
};

export type ResponseRegisterDto= CommonResponse<{
  id: number,
  name: string,
  email: string,
  bio: string | null,
  avatar: string | null,
  createdAt: Date,
  updatedAt: Date,
}>;

export type RequestLoginDto = {
    email: string,
    password:string,
}

export type ResponseLoginDto = CommonResponse <{
    id:number,
    name:string,
    accessToken:string,
    refreshToken: string,
}>;

export type ResponseLogoutDto = CommonResponse <{
    data:null
}>;
export type ResponseMyInfoDto = CommonResponse<{
    id: number,
    name: string,
    email: string,
    bio: string | null,
    avatar: string | null,
    createdAt: Date,
    updatedAt: Date,
}>
export type UserInfo = ResponseMyInfoDto['data'];

export type RequestPatchMyInfoDto={
    name: string,
    bio: string,
    email:string,
}
export type ResponseRefreshDTO = CommonResponse<{
    id:number,
    name:string,
    accessToken:string,
    refreshToken:string,
}>

export type RequestRefreshDTO = {
    refresh:string,
}

export type RequestCreateLpDto = {
    title: string,
    content: string, 
    thumbnail: string,
    tags: string[],
    published: boolean,
}

export type ResponseCreateLpDto = CommonResponse<{
    id:number,
    title: string,
    content: string, 
    thumbnail: string,
    published: boolean,
    authorId:number,
    createdAt: Date,
    updatedAt: Date,
}>