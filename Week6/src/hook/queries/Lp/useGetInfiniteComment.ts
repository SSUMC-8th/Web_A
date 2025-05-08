import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../constants/key";
import { getLpComments } from "../../../api/Get/lp";
import { PAGINATION_ORDER } from "../../../enums/pagination";

function useGetInfiniteComment(
  id: number,
  limit: number,
  order: PAGINATION_ORDER
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getLpComments({ id, cursor: pageParam, limit, order }),
    queryKey: [QUERY_KEY.comment, order],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteComment;
