import { useQuery } from "@tanstack/react-query";
import { LpId } from "../../types/lptype";
import { QueryKeys } from "../../constants/key";
import { getLpDetail } from "../../apis/lp";

const useGetLpDetail = (lpId: LpId) => {
  return useQuery({
    queryKey: [QueryKeys.lps, lpId],
    queryFn: () => getLpDetail({ lpId }),
  });
};

export default useGetLpDetail;
