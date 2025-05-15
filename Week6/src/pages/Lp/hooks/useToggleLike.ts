import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLike, deleteLike } from '../../../apis/lp';

interface LikeParams {
    lpId: number;
    isLiked: boolean;
}

export const useToggleLike = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ lpId, isLiked }: LikeParams) => {
            return isLiked ? deleteLike(lpId) : postLike(lpId);
        },

        // Optimistic update
        onMutate: ({ lpId, isLiked }) => {
            queryClient.cancelQueries({ queryKey: ['lpDetail', lpId] });

            const previous = queryClient.getQueryData(['lpDetail', lpId]);

            queryClient.setQueryData(['lpDetail', lpId], (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    isLiked: !isLiked,
                    likeCount: old.likeCount + (isLiked ? -1 : 1),
                };
            });

            console.log('옵티미스틱 성공이ㅛㅁ');

            return { previous };
        },

        // 실패 시 롤백
        onError: (_, __, context) => {
            if (context?.previous) {
                queryClient.setQueryData(
                    ['lpDetail', context.previous],
                    context.previous,
                );
            }
        },

        // 서버와 동기화
        onSettled: (_, __, { lpId }) => {
            queryClient.invalidateQueries({ queryKey: ['lpDetail', lpId] });
        },
    });
};
