import { PatchCommentDto, ResponseLpCommentDto } from "../../types/lp";
import axiosInstance from "../axios-instance";

export const pathComment = async ({
  lpId,
  commentId,
  content,
}: PatchCommentDto): Promise<ResponseLpCommentDto> => {
  const { data } = await axiosInstance.patch(
    `/lps/${lpId}/comments/${commentId}`,
    { content }
  );

  return data;
};
