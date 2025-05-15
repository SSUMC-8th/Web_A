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
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.lpComment, data.id]
      });
    },
  });
}


export default usePostCreateComment;
