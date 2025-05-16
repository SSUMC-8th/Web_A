import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postComment } from '../../../apis/lp';
import { QUERY_KEY } from '../../../constants/key';

export const useCreateComments = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postComment,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.comments, variables.lpId],
            });
        },
        onError: (err) => {
            console.error('댓글 생성 실패', err);
        },
    });
};
