import { useMutation } from "@tanstack/react-query";
import { patchLpComment } from "../../apis/lp";
import { queryClient } from "../../App";
import { QueryKeys } from "../../constants/key";
import { RequestPatchCommentDto, ResponseLpCommentDto } from "../../types/comment";

function usePatchComment() {
  return useMutation({
    mutationFn: (data: RequestPatchCommentDto): Promise<ResponseLpCommentDto> => patchLpComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.lpComment],
      });
    },
  });
}

export default usePatchComment;
