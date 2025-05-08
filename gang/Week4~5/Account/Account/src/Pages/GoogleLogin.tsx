import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("name");
    const aToken = params.get("accessToken");
    const rToken = params.get("refreshToken");
    if (aToken && rToken && username) {
      localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, aToken);
      localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, rToken);
      localStorage.setItem(LOCAL_STORAGE_KEY.username, username);
      window.location.href = "/mypage";    }
  }, [navigate]);
  return <LoadingSpinner />;
};

export default GoogleLogin;
