import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/TokenContext/useAuth";

const ProtectedLayout = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
