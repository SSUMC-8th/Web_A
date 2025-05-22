import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteLp } from '@/apis/lps';
import { QUERY_KEY } from '@/constants/key';

export const useDeleteLp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLp,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpInfo, variables],
      });
    },
    onError: (err) => {
      console.error('lp 삭제 실패', err);
    },
  });
};
