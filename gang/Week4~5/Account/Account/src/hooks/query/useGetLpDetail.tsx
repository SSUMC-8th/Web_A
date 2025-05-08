import { useQuery } from "@tanstack/react-query";
import { LpId } from "../../types/lptype";
import { QueryKeys2 } from "../../constants/key";
import { getLpDetail } from "../../apis/lp";

const useGetLpDetail = (lpId:LpId) => {
  return useQuery({    
    queryKey: [QueryKeys2.lpDetail, lpId],
    queryFn: () => getLpDetail(lpId),
    enabled: !isNaN(lpId) && lpId !== null, // lpId가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export default useGetLpDetail;
