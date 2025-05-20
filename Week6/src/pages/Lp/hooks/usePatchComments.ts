import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchComment } from '#/apis/lp';
import { QUERY_KEY } from '#/constants/key';

export const usePatchComments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, variables.lpId],
      });
    },
    onError: (err) => {
      console.error('댓글 수정 실패', err);
    },
  });
};
