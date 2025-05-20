import { useInfiniteQuery } from '@tanstack/react-query';

import { getLpInfo } from '#/apis/lp';
import { SortOrder } from '#/constants/sort';
import { ResponseLpDto } from '#/types/lp';

interface useGetLpListProps {
  search?: string | null;
  order?: SortOrder;
  //검색 시 전체데이터 받아오는 버그 방지
  enabled?: boolean;
}

function useGetLpList({ search, order, enabled }: useGetLpListProps) {
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
    enabled,
  });

  return data;
}

export default useGetLpList;
