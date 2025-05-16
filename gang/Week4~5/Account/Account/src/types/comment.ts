import { CursorBasedResponse } from "./common";

export type ResponseLpCommentDto=CursorBasedResponse<CommentDetail>

export type CommentDetail = {
  id: number;
  content: string;
  lpId: number;
  authorId: number; 
  createdAt: Date;
  updatedAt: Date;
  author: Author;
};  

export type Author ={
    id:number;
    name:string;
    email: string;
    bio: string|null,
    avatar: string|null,
    createdAt: Date;
    updatedAt: Date;    
}

export type RequestCommentDto ={
  content : string
}

export interface useCommentProps{
    commentId:number,
    lpId:number,
}

export type RequestPatchCommentDto={
  content:string,
  commentId: number,
  lpId:number
}
