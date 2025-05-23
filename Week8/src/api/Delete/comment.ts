import { DeleteCommentDto, ResponseDeleteComment } from "../../types/lp";
import axiosInstance from "../axios-instance";

export const deleteComment = async ({
  lpId,
  commentId,
}: DeleteCommentDto): Promise<ResponseDeleteComment> => {
  const { data } = await axiosInstance.delete(
    `/lps/${lpId}/comments/${commentId}`
  );

  return data;
};
