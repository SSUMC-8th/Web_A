import { useInfiniteQuery } from "@tanstack/react-query";
import { PAGENATION_ORDER } from "../enums/common";
import { getLpList } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";
import { ResponseLpListDto } from "../types/lp";

export default function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGENATION_ORDER
) {
  return useInfiniteQuery<ResponseLpListDto>({
    queryKey: [QUERY_KEY.lps, search, order], // ✅ 식별 키
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: ResponseLpListDto) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}
