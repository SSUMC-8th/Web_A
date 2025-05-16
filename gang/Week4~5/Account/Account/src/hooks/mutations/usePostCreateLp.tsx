import { useMutation } from "@tanstack/react-query";
import { postCreateLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QueryKeys } from "../../constants/key";

function usePostCreateLp() {
  return useMutation({
    mutationFn: postCreateLp,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.newLps, data.data.id],
        exact: false
      });
    },
  });
}

export default usePostCreateLp;
