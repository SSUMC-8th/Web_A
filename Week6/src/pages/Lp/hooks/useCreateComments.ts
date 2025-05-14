import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postComment } from '../../../apis/lp';

export const useCreateComments = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postComment,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['comments', variables.lpId],
            });
        },
        onError: (err) => {
            console.error('댓글 생성 실패', err);
        },
    });
};
