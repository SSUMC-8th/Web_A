import { useAuth } from '@/context/AuthContext';
import { tokenStorage } from '@/utils/tokenStorage';

export const updateAccessToken = (token: string | null) => {
  const { setAccessToken } = useAuth();
  setAccessToken(token);
  tokenStorage.setAccessToken(token);
};

export const updateRefreshToken = (token: string | null) => {
  const { setRefreshToken } = useAuth();
  setRefreshToken(token);
  tokenStorage.setRefreshToken(token);
};
