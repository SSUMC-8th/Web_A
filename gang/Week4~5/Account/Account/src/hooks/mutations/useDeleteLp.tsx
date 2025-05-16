import { LpId } from "../../types/lptype";
import { deleteLps } from "../../apis/lp";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QueryKeys } from "../../constants/key";

function useDeleteLp() {
  return useMutation({
    mutationFn: (lpId: LpId) => deleteLps(lpId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.lps],
      });
    },
  });
}

export default useDeleteLp;
