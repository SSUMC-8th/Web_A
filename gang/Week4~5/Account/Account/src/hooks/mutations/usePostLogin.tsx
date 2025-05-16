import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../../apis/auth";
import { RequestLoginDto } from "../../types/auth";

function usePostLogin() {
  return useMutation({
    mutationFn: (data:RequestLoginDto)=> postLogin(data),
    onSuccess: (data) => {
        console.log(data);
    },
    onError: (error) => {
      console.error("로그인 실패", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    },
  });
}

export default usePostLogin;
