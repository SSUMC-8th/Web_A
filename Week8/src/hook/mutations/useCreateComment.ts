// src/hooks/mutations/useCreateLp.ts
import { useMutation } from "@tanstack/react-query";
import { createComment } from "../../api/Post/lp";
import { queryClient } from "../../main";
import { QUERY_KEY } from "../../constants/key";
import { commentDetailDto, CreateCommentDto } from "../../types/lp";

export function useCreateComment() {
  return useMutation<commentDetailDto, Error, CreateCommentDto>({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comment],
        exact: false,
      });
    },
  });
}
