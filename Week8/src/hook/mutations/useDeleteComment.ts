import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../main";
import { QUERY_KEY } from "../../constants/key";
import { DeleteCommentDto, ResponseDeleteComment } from "../../types/lp";
import { deleteComment } from "../../api/Delete/comment";

export function useDeleteComment() {
  return useMutation<ResponseDeleteComment, Error, DeleteCommentDto>({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comment],
        exact: false,
      });
    },
  });
}
