import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../../../api/Get/users";
import { QUERY_KEY } from "../../../constants/key";

export function useGetMyInfo() {
  return useQuery({
    queryKey: [QUERY_KEY.my],
    queryFn: () => getMyInfo(),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
