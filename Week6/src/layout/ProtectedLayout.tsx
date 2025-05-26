import { PropsWithChildren } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';

const ProtectedLayout = ({ children }: PropsWithChildren) => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    alert('로그인이 필요한 서비스입니다. 로그인을 해주세요!');
    return <Navigate to={'/login'} replace />;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
