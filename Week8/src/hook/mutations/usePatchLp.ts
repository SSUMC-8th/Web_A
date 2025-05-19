import { useMutation } from "@tanstack/react-query";
import { patchLp } from "../../api/Patch/lp";
import { PatchLpDto, ResponseLpDto } from "../../types/lp";
import { queryClient } from "../../main";
import { QUERY_KEY } from "../../constants/key";

export const usePatchLp = () => {
  return useMutation<ResponseLpDto, Error, { lpId: number; body: PatchLpDto }>({
    mutationFn: ({ lpId, body }) => patchLp(lpId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
        exact: false,
      });
    },
  });
};
