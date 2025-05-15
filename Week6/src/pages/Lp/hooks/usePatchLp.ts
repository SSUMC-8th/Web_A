import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchLp } from '../../../apis/lp';

export const usePatchLp = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: patchLp,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['lpDetail', variables.lpId],
            });
        },
        onError: (err) => {
            console.error('lp 수정 실패', err);
        },
    });
};
