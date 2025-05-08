import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  onReject?: () => void;
  fallback?: React.ReactNode; // 권한 체크가 완료되지 않았을 때 보여줄 fallback 컴포넌트
}

const ProtectedRoute = ({ children, onReject, fallback = null }: ProtectedRouteProps) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false); // 보호 검사 완료 여부

  useEffect(() => {
    if (!accessToken) {
      if (onReject) onReject();
      navigate("/login", { replace: true });
    } else {
      setChecked(true); // 권한 체크 완료됨
    }
  }, [accessToken, navigate, onReject]);

  if (!checked) return fallback;

  return <>{children}</>;
};

export default ProtectedRoute;
