import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react';
import { RequestSigninDto, ResponseMyInfoDto } from '../types/auth';
import { postLogout, postSignin, getMyInfo } from '../apis/auth';
import { tokenStorage } from '../utils/tokenStorage';

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    myInfo: ResponseMyInfoDto | null;
    login: (signinData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    myInfo: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [accessToken, setAccessToken] = useState<string | null>(
        tokenStorage.getAccessToken(),
    );
    const [refreshToken, setRefreshToken] = useState<string | null>(
        tokenStorage.getRefreshToken(),
    );
    const [myInfo, setMyInfo] = useState<ResponseMyInfoDto | null>(null);

    const loginWithToken = async () => {
        try {
            const userInfo = await getMyInfo();
            setMyInfo(userInfo);
        } catch (error) {
            console.error('유저 정보 불러오기 실패', error);
        }
    };

    const login = async (signinData: RequestSigninDto) => {
        try {
            const { data } = await postSignin(signinData);

            if (data) {
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;

                tokenStorage.setAccessToken(newAccessToken);
                tokenStorage.setRefreshToken(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);

                await loginWithToken();
            }
        } catch (error) {
            console.error('로그인 실패', error);
        }
    };

    const logout = async () => {
        try {
            await postLogout();

            tokenStorage.clear();

            setAccessToken(null);
            setRefreshToken(null);
            setMyInfo(null);
        } catch (error) {
            console.error('로그아웃 실패', error);
        }
    };

    useEffect(() => {
        if (accessToken) {
            loginWithToken();
        }
    }, [accessToken]);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                refreshToken,
                myInfo,
                login,
                logout,
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
