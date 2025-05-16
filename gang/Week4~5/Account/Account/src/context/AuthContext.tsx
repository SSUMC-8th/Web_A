import {  postLogout } from "../apis/auth";
import { getMyInfo } from "../apis/user";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useLocalStorage from "../hooks/useLocalStorage";
import {  UserInfo } from "../types/auth";
import { createContext, PropsWithChildren, useContext, useState } from "react";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
  username: string | null;
  setUsername: (username: string | null) => void;
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo | null) => void;
  getmyinfo: () => void;
  setAuthInfo: (data: { accessToken: string; refreshToken: string; username: string }) => void;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  username: null,
  userInfo: null,
  setUsername: () => {},
  logout: async () => {},
  setUserInfo: () => {},
  getmyinfo: async () => {},
  setAuthInfo: () =>{},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const {
    getItem: getUsernameFromStorage,
    setItem: setUsernameInStorage,
    removeItem: removeUsernameFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.username);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!accessToken && !!refreshToken
  );
  const [username, setUsername] = useState<string | null>(
    getUsernameFromStorage()
  );
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
   const setAuthInfo = (data: { accessToken: string; refreshToken: string; username: string }) => {
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setUsername(data.username);

    setAccessTokenInStorage(data.accessToken);
    setRefreshTokenInStorage(data.refreshToken);
    setUsernameInStorage(data.username);

    setIsLoggedIn(true);
  };


  const logout = async () => {
  try {
    await postLogout();

    removeAccessTokenFromStorage();
    removeRefreshTokenFromStorage();
    removeUsernameFromStorage();

    setAccessToken(null);
    setRefreshToken(null);
    setUsername(null);
    setIsLoggedIn(false);

    console.log("로그아웃 성공");
  } catch (error) {
    console.error("로그아웃 실패", error);
  }
};


  const getmyinfo = async () => {
    try {
      const { data } = await getMyInfo();
      setUserInfo(data);
    } catch (error) {
      console.error("회원 정보 조회 실패", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        username,
        setAuthInfo,
        logout,
        isLoggedIn,
        userInfo,
        setUserInfo,
        getmyinfo,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context: AuthContextType = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }
  return context;
};
