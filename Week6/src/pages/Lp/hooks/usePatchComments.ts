import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchComment } from '../../../apis/lp';

export const usePatchComments = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: patchComment,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['comments', variables.lpId],
            });
        },
        onError: (err) => {
            console.error('댓글 수정 실패', err);
        },
    });
};
