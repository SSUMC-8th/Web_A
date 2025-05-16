import { useMutation } from "@tanstack/react-query";
import { LpId, ResponseLpDetailDto, UpdateLpsDto } from "../../types/lptype";
import { queryClient } from "../../App";
import { QueryKeys } from "../../constants/key";
import { patchLps } from "../../apis/lp";

interface usePatchLpProps {
  lpId: LpId;
  body: UpdateLpsDto;
}

function usePatchLp() {
  return useMutation({
    mutationFn: ({
      lpId,
      body,
    }: usePatchLpProps): Promise<ResponseLpDetailDto> => patchLps(lpId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.lps],
      });
    },
  });
}
export default usePatchLp;
