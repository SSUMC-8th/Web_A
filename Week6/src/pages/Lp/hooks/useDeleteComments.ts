import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../../../apis/lp';

export const useDeleteComments = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteComment,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['comments', variables.lpId],
            });
        },
        onError: (err) => {
            console.error('댓글 삭제 실패', err);
        },
    });
};
