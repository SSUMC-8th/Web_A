import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postImagePrivate } from '#/apis/image';
import { postLp } from '#/apis/lp';
import { UploadImageDto } from '#/types/image';
import { CreateLpDto } from '#/types/lp';

export const useCreateLp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      lpData,
    }: {
      file: File | null;
      //CreateLpDto에서 thumbnail 제거
      lpData: Omit<CreateLpDto, 'thumbnail'>;
    }) => {
      let imageUrl = '';

      if (file) {
        const { data }: { data: UploadImageDto } = await postImagePrivate(file);
        imageUrl = data.imageUrl;
      }
      console.log(imageUrl);
      return await postLp({
        ...lpData,
        thumbnail: imageUrl,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lp'] });
      console.log('성공!');
    },
    onError: (err) => {
      console.error('LP 생성 실패:', err);
    },
  });
};
