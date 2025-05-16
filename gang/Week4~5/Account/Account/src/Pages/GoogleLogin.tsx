import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const { setAuthInfo } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("name") || "  ";
    const aToken = params.get("accessToken");
    const rToken = params.get("refreshToken");

    if (aToken && rToken && username) {
      setAuthInfo({
        accessToken: aToken,
        refreshToken: rToken,
        username: username,
      });

      navigate("/mypage");
    } else {
    console.log("로딩중")    }
  }, [navigate, setAuthInfo]);

  return <LoadingSpinner />;
};

export default GoogleLogin;
