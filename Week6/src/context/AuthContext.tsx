import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { RequestSigninDto } from '../types/auth';
import { LOCAL_STORAGE_KEY } from '../constants/key';
import { postLogout, postSignin } from '../apis/auth';

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signinData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenInStorage,
        removeItem: removeAccessTokenFromStorage,
    } = localStorage;
    const {
        getItem: getRefreshTokenFromStorage,
        setItem: setRefreshTokenInStorage,
        removeItem: removeRefreshTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromStorage(),
    );
    const [refreshToken, setRefreshToken] = useState<string | null>(
        getRefreshTokenFromStorage(),
    );

    const login = async (signinData: RequestSigninDto) => {
        try {
            const { data } = await postSignin(signinData);

            if (data) {
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);

                alert('ㅇㅋ');
            }
        } catch {
            alert('ㄴㄴ');
        }
    };

    const logout = async () => {
        try {
            await postLogout();

            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            setAccessToken(null);
            setRefreshToken(null);

            alert('ㄲㅈ');
        } catch {
            alert('ㄴㄴ');
        }
    };

    return (
        <AuthContext.Provider
            value={{ accessToken, refreshToken, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('없는데용');
    }

    return context;
};
