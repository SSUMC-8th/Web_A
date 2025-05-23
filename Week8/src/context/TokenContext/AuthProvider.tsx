import { PropsWithChildren, useEffect, useState } from "react";
import { RequestSignInDto } from "../../types/auth";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { AuthContext } from "./AuthContext";
import { useSignIn } from "../../hook/mutations/useLogin";
import { useSignOut } from "../../hook/mutations/useLogOut";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { getItem: getAccessTokenFromStorage } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );

  const { getItem: getRefreshTokenFromStorage } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  const [accessToken, setAccessToken] = useState<string | null>(() =>
    getAccessTokenFromStorage()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    getRefreshTokenFromStorage()
  );

  // 로그인 상태 동기화
  useEffect(() => {
    setAccessToken(getAccessTokenFromStorage());
    setRefreshToken(getRefreshTokenFromStorage());
  }, [getAccessTokenFromStorage, getRefreshTokenFromStorage]);

  const isLoggedIn = !!accessToken;

  const { mutateAsync: signIn } = useSignIn();
  const { mutateAsync: signOut } = useSignOut();

  const login = async (dto: RequestSignInDto) => {
    await signIn(dto);
  };

  const logout = async () => {
    await signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
