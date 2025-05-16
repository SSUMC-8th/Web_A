import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  //토큰 없으면 로그인페이지로 이동
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return <Outlet />;
};

export default ProtectedLayout;
