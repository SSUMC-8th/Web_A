import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchUsers } from '../../../apis/users';

export const usePatchUsers = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: patchUsers,
        onMutate: async (updated) => {
            await queryClient.cancelQueries({ queryKey: ['users'] });

            const previous = queryClient.getQueryData(['users']);

            queryClient.setQueryData(['users'], (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    ...updated,
                };
            });

            console.log('옵티미스틱쓴패치유저');

            return { previous };
        },
        // 실패 시 롤백
        onError: (_, __, context) => {
            if (context?.previous) {
                queryClient.setQueryData(['users'], context.previous);
            }
        },

        // 서버와 동기화
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};
