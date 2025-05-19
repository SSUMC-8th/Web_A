// src/hooks/mutations/useCreateLp.ts
import { useMutation } from "@tanstack/react-query";
import { createLp } from "../../api/Post/lp";
import { queryClient } from "../../main";
import { QUERY_KEY } from "../../constants/key";
import { CreateLpDto, ResponseLpDto } from "../../types/lp";

export function useCreateLp() {
  return useMutation<ResponseLpDto, Error, CreateLpDto>({
    mutationFn: createLp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
        exact: false,
      });
    },
  });
}
