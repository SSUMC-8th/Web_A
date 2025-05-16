import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QueryKeys } from "../../constants/key";
import { postCreateComment } from "../../apis/lp";
import { LpId } from "../../types/lptype";
import { RequestCommentDto } from "../../types/comment";

interface usePostCreateCommentProps{
      lpId: LpId,
      body: RequestCommentDto,
}

function usePostCreateComment() {
  return useMutation({
    mutationFn: ({ lpId, body }: usePostCreateCommentProps) => postCreateComment(lpId, body),
    onSuccess: (variables) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.lpComment, variables.lpId],
      });
      queryClient.refetchQueries({
        queryKey: [QueryKeys.lpComment, variables.lpId],
      });
    },
  });
}

export default usePostCreateComment;
