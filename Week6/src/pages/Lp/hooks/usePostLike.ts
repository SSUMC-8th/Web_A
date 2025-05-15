import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLike } from '../../../apis/lp';

export const usePostLike = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postLike,
        onSuccess: (_, lpId) => {
            queryClient.invalidateQueries({ queryKey: ['lpDetail', lpId] });
        },
        onError: (err) => {
            console.error('좋아요 달기 실패', err);
        },
    });
};
