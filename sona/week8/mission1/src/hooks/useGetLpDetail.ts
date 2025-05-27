import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";
import axiosInstance from "../apis/axios";
import { LpDetail, LpDetailResponseDto } from "../types/lpDetail";

export default function useGetLpDetail(lpId: number) {
  return useQuery<LpDetail>({
    queryKey: [QUERY_KEY.lpDetail, lpId],
    queryFn: () =>
      axiosInstance
        .get<LpDetailResponseDto>(`/v1/lps/${lpId}`)
        .then((res) => res.data.data),
    enabled: !!lpId,
  });
}
