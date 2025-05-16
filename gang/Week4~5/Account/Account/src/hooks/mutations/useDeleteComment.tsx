import { useMutation } from "@tanstack/react-query";
import { ResponseLpCommentDto, useCommentProps } from "../../types/comment";
import { queryClient } from "../../App";
import { QueryKeys } from "../../constants/key";
import { deleteLpComment } from "../../apis/lp";

function useDeleteComment() {
  return useMutation({
    mutationFn: ({ commentId, lpId }: useCommentProps): Promise<ResponseLpCommentDto> =>
      deleteLpComment({ commentId, lpId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.lpComment],
      });
    },
  });
}

export default useDeleteComment;
