import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../../apis/users';

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
        },
        onError: (err) => {
            console.error('댓글 생성 실패', err);
        },
    });
};
