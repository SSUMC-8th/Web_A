import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLike } from '../../../apis/lp';

export const useDeleteLike = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteLike,
        onSuccess: (_, lpId) => {
            queryClient.invalidateQueries({ queryKey: ['lpDetail', lpId] });
        },
        onError: (err) => {
            console.error('좋아요 취소 실패', err);
        },
    });
};
