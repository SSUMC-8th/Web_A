import { useInfiniteQuery } from '@tanstack/react-query';

import { getLp } from '#/apis/lps';
import { SortOrder } from '#/constants/sort';
import { ResponseGetLpDto } from '#/types/lps';

interface useGetLpListProps {
  search?: string | null;
  order?: SortOrder;
  //검색 시 전체데이터 받아오는 버그 방지
  enabled?: boolean;
}

function useGetLpList({ search, order, enabled }: useGetLpListProps) {
  const data = useInfiniteQuery<ResponseGetLpDto, Error>({
    queryKey: ['lpInfo', search, order],
    queryFn: ({ pageParam = null }) =>
      getLp({
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
