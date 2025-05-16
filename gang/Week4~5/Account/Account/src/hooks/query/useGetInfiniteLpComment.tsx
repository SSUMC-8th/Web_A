import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../constants/key";
import { getLpComment } from "../../apis/lp";
import { LpCommentParams } from "../../types/common";

export function useGetInfiniteLpComment({
  lpId,
  limit,
  order,
}: LpCommentParams) {
  return useInfiniteQuery({
    queryKey: [QueryKeys.lpComment, lpId, order],
    queryFn: ({ pageParam }) => {
      return getLpComment({ cursor: pageParam, lpId, limit, order });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteLpComment;
