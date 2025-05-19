import { useInfiniteQuery } from '@tanstack/react-query';

import { getLpInfo } from '#/apis/lp';
import { SortOrder } from '#/constants/sort';
import { ResponseLpDto } from '#/types/lp';

interface useGetLpListProps {
  search?: string;
  order?: SortOrder;
}

function useGetLpList({ search, order }: useGetLpListProps) {
  const data = useInfiniteQuery<ResponseLpDto, Error>({
    queryKey: ['lpInfo', search, order],
    queryFn: ({ pageParam = null }) =>
      getLpInfo({
        cursor: pageParam as number | null,
        limit: 12,
        search,
        order,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
  });

  return data;
}

export default useGetLpList;
