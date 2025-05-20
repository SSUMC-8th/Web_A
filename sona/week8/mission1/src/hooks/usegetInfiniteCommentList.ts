import { useInfiniteQuery } from "@tanstack/react-query";
import { PAGENATION_ORDER } from "../enums/common";
import { QUERY_KEY } from "../constants/key";
import { ResponseCommentListDto } from "../types/comment";
import { getCommentList } from "../apis/comment";

export default function useGetInfiniteCommentList(
  lpId: number,
  cursor: number,
  limit: number,
  order: PAGENATION_ORDER
) {
  return useInfiniteQuery<ResponseCommentListDto>({
    queryKey: [QUERY_KEY.comment, order],
    queryFn: ({ pageParam }) =>
      getCommentList({ lpId, cursor: pageParam, limit, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: ResponseCommentListDto) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}
