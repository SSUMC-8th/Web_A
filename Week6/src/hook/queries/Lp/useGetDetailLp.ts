import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../../api/Get/lp";

export function useGetLpDetail(id: number) {
  return useQuery({
    queryKey: ["lp", id],
    queryFn: () => getLpDetail(id),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
