import { useMutation } from "@tanstack/react-query";
import { RequestPatchMyInfoDto } from "../../types/auth";
import { patchMyInfo } from "../../apis/user";
import { queryClient } from "../../App";
import { QueryKeys } from "../../constants/key";


function usePatchUsers(){
  return useMutation({
    mutationFn: (data:RequestPatchMyInfoDto) => patchMyInfo(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.myInfo, data.data.id]
      });
    },
  });
}





export default usePatchUsers
