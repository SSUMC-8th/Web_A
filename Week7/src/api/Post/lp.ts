import {
  commentDetailDto,
  CreateCommentDto,
  CreateLpDto,
  RequestLpDto,
  ResponseLikeLpDto,
  ResponseLpDto,
} from "../../types/lp";
import axiosInstance from "../axios-instance";

export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/lps/${lpId}/likes`);
  return data;
};

export const createLp = async (body: CreateLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.post("/lps", body);
  return data;
};

export const createComment = async ({
  lpId,
  content,
}: CreateCommentDto): Promise<commentDetailDto> => {
  const { data } = await axiosInstance.post(`/lps/${lpId}/comments`, {
    content,
  });
  return data;
};
