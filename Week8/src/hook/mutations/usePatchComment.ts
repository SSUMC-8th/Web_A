import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../main";
import { QUERY_KEY } from "../../constants/key";
import { PatchCommentDto, ResponseLpCommentDto } from "../../types/lp";
import { pathComment } from "../../api/Patch/comment";

export function usePatchComment() {
  return useMutation<ResponseLpCommentDto, Error, PatchCommentDto>({
    mutationFn: pathComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comment],
        exact: false,
      });
    },
  });
}
