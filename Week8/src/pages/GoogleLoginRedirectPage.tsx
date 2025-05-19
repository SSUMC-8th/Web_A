import { useEffect } from "react";
import { useLocalStorage } from "../hook/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import RoutePaths from "../router/routePaths";
import LoadingSpinner from "../components/LoadingSpinner";

const GoogleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      window.location.href = RoutePaths.MYPAGE;
    }
  }, [setAccessToken, setRefreshToken]);
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <LoadingSpinner />
    </div>
  );
};

export default GoogleLoginRedirectPage;
