import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";
import { CommentPageDto } from "../types/common";
import { getCommentList } from "../apis/comment";

export default function useGetCommentList(params: CommentPageDto) {
  const { lpId } = params;
  return useQuery({
    queryKey: [QUERY_KEY.comment, lpId],
    queryFn: () => getCommentList(params),
    select: (res) => res.data,

    enabled: !!lpId,
  });
}
