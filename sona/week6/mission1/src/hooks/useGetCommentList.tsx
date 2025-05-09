import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";
import { getCommentList } from "../apis/lp";
import { CommentPageDto } from "../types/common";

export default function useGetCommentList(params: CommentPageDto) {
  const { lpId } = params;
  return useQuery({
    queryKey: [QUERY_KEY.comment, lpId],
    queryFn: () => getCommentList(params),
    select: (res) => res.data,

    enabled: !!lpId,
  });
}
