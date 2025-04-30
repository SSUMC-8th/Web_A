import { createContext } from "react";
import { RequestSignInDto } from "../../types/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  login: (signInData: RequestSignInDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
});
