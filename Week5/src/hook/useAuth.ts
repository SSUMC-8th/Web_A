import { useLocalStorage } from "./useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const useAuth = () => {
  const { getItem, removeItem } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const token = getItem();
  const isLoggedIn = !!token;

  const logout = () => {
    removeItem();
    window.location.href = "/";
  };

  return { isLoggedIn, logout };
};
