import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment } from '#/apis/lp';
import { QUERY_KEY } from '#/constants/key';

export const useDeleteComments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, variables.lpId],
      });
    },
    onError: (err) => {
      console.error('댓글 삭제 실패', err);
    },
  });
};
