import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../constants/key";
import { getLpList } from "../../apis/lp";
import { LpParams } from "../../types/common";

export function useGetInfiniteLpList({ limit, search, order }: LpParams) {
  return useInfiniteQuery({
    queryKey: [QueryKeys.lps, order, search],
    queryFn: ({ pageParam }) => {
      return getLpList({ cursor: pageParam, limit, search, order });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    enabled: search !== undefined, // 혹은 debounced.length > 0
    staleTime: 1000 * 60,
  });
}

export default useGetInfiniteLpList;
