import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchLpDetail } from '#/apis/lps';
import { QUERY_KEY } from '#/constants/key';

export const usePatchLp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchLpDetail,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpDetail, variables.lpId],
      });
    },
    onError: (err) => {
      console.error('lp 수정 실패', err);
    },
  });
};
