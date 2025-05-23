import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../../api/Get/lp";
import { QUERY_KEY } from "../../../constants/key";

export function useGetLpDetail(lpId: number) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetail(lpId),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
