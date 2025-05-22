import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchUsers } from '#/apis/users';
import { QUERY_KEY } from '#/constants/key';

export const usePatchUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUsers,
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.users] });

      const previous = queryClient.getQueryData([QUERY_KEY.users]);

      queryClient.setQueryData([QUERY_KEY.users], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            avatar: updated.avatar,
            name: updated.name,
            bio: updated.bio,
          },
        };
      });

      console.log('옵티미스틱쓴패치유저');

      return { previous };
    },
    // 실패 시 롤백
    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData([QUERY_KEY.users], context.previous);
      }
    },

    // 서버와 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.users] });
    },
  });
};
