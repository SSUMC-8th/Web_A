import { useMutation } from "@tanstack/react-query";
import { RequestPatchMyInfoDto, ResponseMyInfoDto } from "../../types/auth";
import { patchMyInfo } from "../../apis/user";
import { queryClient } from "../../App";
import { QueryKeys } from "../../constants/key";

const usePatchUsers = () => {
  return useMutation<ResponseMyInfoDto, Error, RequestPatchMyInfoDto>({
    mutationFn: (data) => patchMyInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.myInfo],
      });
    },
  });
};

export default usePatchUsers;