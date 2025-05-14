import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postImagePrivate } from '../../../apis/image';
import { postLp } from '../../../apis/lp';
import { UploadImageDto } from '../../../types/image';
import { CreateLpDto } from '../../../types/lp';

interface UseCreateLpProps {
    onSuccess?: () => void;
    onError?: (err: unknown) => void;
}

export const useCreateLp = ({ onSuccess, onError }: UseCreateLpProps = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            file,
            lpData,
        }: {
            file: File | null;
            lpData: Omit<CreateLpDto, 'thumbnail'>;
        }) => {
            let imageUrl = '';

            if (file) {
                const { data }: { data: UploadImageDto } =
                    await postImagePrivate(file);
                imageUrl = data.imageUrl;
            }

            return await postLp({
                ...lpData,
                thumbnail: imageUrl,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lpInfo'] });
            onSuccess?.();
        },
        onError: (err) => {
            console.error('LP 생성 실패:', err);
            onError?.(err);
        },
    });
};
