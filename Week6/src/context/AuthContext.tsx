import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import { tokenStorage } from '../utils/tokenStorage';

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;

  refreshToken: string | null;
  setRefreshToken: Dispatch<SetStateAction<string | null>>;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
  refreshToken: null,
  setRefreshToken: () => {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    tokenStorage.getAccessToken(),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    tokenStorage.getRefreshToken(),
  );

  const isLoggedIn = !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('ㄴㄴ');
  }

  return context;
};
