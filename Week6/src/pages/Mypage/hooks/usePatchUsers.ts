import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchUsers } from '../../../apis/users';

export const usePatchUsers = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: patchUsers,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
        },
        onError: (err) => {
            console.error('실패 ㅅㄱㅇ', err);
        },
    });
};
