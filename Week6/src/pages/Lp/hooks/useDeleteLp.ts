import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLp } from '../../../apis/lp';

export const useDeleteLp = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteLp,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['lp', variables],
            });
        },
        onError: (err) => {
            console.error('lp 삭제 실패', err);
        },
    });
};
