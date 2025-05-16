import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";
import { ResponseLogoutDto } from "../../types/auth";

function usePostLogout() {
  return useMutation({
    mutationFn: (): Promise<ResponseLogoutDto> => postLogout(),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export default usePostLogout;
