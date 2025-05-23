import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../api/Delete/lp";
import { RequestLpDto, ResponseDeleteLp } from "../../types/lp";
import { queryClient } from "../../main";
import { QUERY_KEY } from "../../constants/key";

export const useDeleteLp = () => {
  return useMutation<ResponseDeleteLp, Error, RequestLpDto>({
    mutationFn: ({ lpId }) => deleteLp({ lpId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
        exact: false,
      });
    },
  });
};
