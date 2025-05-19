// src/hooks/mutations/useSignIn.ts
import { useMutation } from "@tanstack/react-query";
import { postSignIn } from "../../api/Post/auth";
import { RequestSignInDto, ResponseSignInDto } from "../../types/auth";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { useLocalStorage } from "../../hook/useLocalStorage";
import RoutePaths from "../../router/routePaths";

export function useSignIn() {
  const { setItem: setAccess } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { setItem: setRefresh } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  return useMutation<ResponseSignInDto, Error, RequestSignInDto>({
    mutationFn: postSignIn,
    onSuccess: (data: ResponseSignInDto) => {
      setAccess(data.data.accessToken);
      setRefresh(data.data.refreshToken);
      alert("로그인 성공");
      window.location.href = RoutePaths.MYPAGE;
    },
    onError: (error: Error) => {
      console.error("로그인 오류", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    },
  });
}
