import { useMutation } from "@tanstack/react-query";
import { postSignOut } from "../../api/Post/auth";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { useLocalStorage } from "../../hook/useLocalStorage";

export function useSignOut() {
  const { removeItem: removeAccess } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { removeItem: removeRefresh } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  return useMutation({
    mutationFn: postSignOut,
    onSuccess: () => {
      removeAccess();
      removeRefresh();
      alert("로그아웃 성공");
      window.location.href = "/";
    },
    onError: (error: Error) => {
      console.error("로그아웃 오류", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    },
  });
}
