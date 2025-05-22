import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getLpDetail } from '#/apis/lps';
import { QUERY_KEY } from '#/constants/key';
import { useGetUsers } from '#/features/users/hooks/useGetUsers';
import { ResponseGetLpDetailDto } from '#/types/lps';

function useLpDetail() {
  const { lpId } = useParams<{ lpId: string }>();
  const id = Number(lpId);

  const { data: myInfo } = useGetUsers();

  const { data, isPending, isError } = useQuery<ResponseGetLpDetailDto>({
    queryKey: [QUERY_KEY.lpDetail, id],
    queryFn: () => getLpDetail(id),
    enabled: Number.isFinite(id),
  });

  const lp = data?.data;
  const isMyLp = lp?.author.id === myInfo?.data.id;
  const alreadyLiked =
    lp?.likes.some((u) => u.userId === myInfo?.data.id) ?? false;

  return {
    lp,
    isMyLp,
    alreadyLiked,
    myInfo,
    isLoading: isPending,
    isError,
  };
}

export default useLpDetail;
