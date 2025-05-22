import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteLike } from '@/apis/likes';
import { QUERY_KEY } from '@/constants/key';

export const useDeleteLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLike,
    onSuccess: (_, lpId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpInfo, lpId],
      });
    },
    onError: (err) => {
      console.error('좋아요 취소 실패', err);
    },
  });
};
