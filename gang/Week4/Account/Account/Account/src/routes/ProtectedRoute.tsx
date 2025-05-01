import { JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element|null => {
  const {accessToken} = useAuth();
  const navigate = useNavigate();
  useEffect (() => {
    if (accessToken === null) {
      navigate("/login", { replace: true });
    }
  }, [accessToken, navigate]);
  if(accessToken ===null) return <LoadingSpinner/>
  return <>{children}</>;
};
export default ProtectedRoute;
