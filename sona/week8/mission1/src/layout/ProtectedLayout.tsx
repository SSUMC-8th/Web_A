import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "../pages/Navbar";

const ProtectedLayout = () => {
  //토큰 없으면 로그인페이지로 이동
  const { accessToken } = useAuth();

  if (!accessToken) {
    alert("로그인이 필요합니다.로그인 해주세요!");
    return <Navigate to={"/login"} replace={true} />;
  }
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
