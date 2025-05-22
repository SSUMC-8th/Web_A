import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteUsers } from '@/apis/users';
import { QUERY_KEY } from '@/constants/key';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.users],
      });
    },
    onError: (err) => {
      console.error('댓글 생성 실패', err);
    },
  });
};
