import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteLike, postLike } from '@/apis/likes';
import { QUERY_KEY } from '@/constants/key';
import { useGetUsers } from '@/features/users/hooks/useGetUsers';

interface LikeParams {
  lpId: number;
  isLiked: boolean;
}

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  const { data: myInfo } = useGetUsers();
  const myUserId = myInfo?.data.id;

  return useMutation({
    mutationFn: ({ lpId, isLiked }: LikeParams) => {
      return isLiked ? deleteLike(lpId) : postLike(lpId);
    },

    onMutate: ({ lpId, isLiked }) => {
      queryClient.cancelQueries({ queryKey: [QUERY_KEY.lpDetail, lpId] });

      const previous = queryClient.getQueryData([QUERY_KEY.lpDetail, lpId]);
      if (!previous || !myUserId) return { previous };

      queryClient.setQueryData([QUERY_KEY.lpDetail, lpId], (old: any) => {
        if (!old) return old;

        const updatedLikes = isLiked
          ? old.data.likes.filter((u: any) => u.userId !== myUserId)
          : [...old.data.likes, { userId: myUserId }];

        //devTool보고 똑같은 Data형식 return해야 함.
        return {
          ...old,
          data: {
            ...old.data,
            likes: updatedLikes,
          },
        };
      });

      return { previous };
    },

    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          [QUERY_KEY.lpDetail, context.previous],
          context.previous,
        );
      }
    },

    onSettled: (_, __, { lpId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpDetail, lpId],
      });
    },
  });
};
