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
import ROUTES from '../constants/routes';
import { useMutation } from '@tanstack/react-query';

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

    // const login = async (signinData: RequestSigninDto) => {
    //     try {
    //         const { data } = await postSignin(signinData);

    //         if (data) {
    //             const newAccessToken = data.accessToken;
    //             const newRefreshToken = data.refreshToken;

    //             tokenStorage.setAccessToken(newAccessToken);
    //             tokenStorage.setRefreshToken(newRefreshToken);

    //             setAccessToken(newAccessToken);
    //             setRefreshToken(newRefreshToken);

    //             await loginWithToken();

    //             alert('로그인성공');
    //             window.location.replace(ROUTES.HOME);
    //         }
    //     } catch (error) {
    //         alert('로그인 실패');
    //         console.error(error);
    //     }
    // };

    // const login = () => {
    //     return useMutation({
    //         mutationFn: postSignin,
    //         onSuccess: (data) => {
    //             const newAccessToken = data.data.accessToken;
    //             const newRefreshToken = data.data.refreshToken;

    //             tokenStorage.setAccessToken(newAccessToken);
    //             tokenStorage.setRefreshToken(newRefreshToken);

    //             setAccessToken(newAccessToken);
    //             setRefreshToken(newRefreshToken);

    //             loginWithToken();

    //             alert('로그인성공');
    //             window.location.replace(ROUTES.HOME);
    //         },
    //         onError: (e) => {
    //             alert('로그인실패');
    //             console.error(e);
    //         },
    //     });
    // };

    const { mutateAsync: useLogin } = useMutation({
        mutationFn: postSignin,
        onSuccess: (data) => {
            const newAccessToken = data.data.accessToken;
            const newRefreshToken = data.data.refreshToken;

            tokenStorage.setAccessToken(newAccessToken);
            tokenStorage.setRefreshToken(newRefreshToken);

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            loginWithToken();

            alert('로그인 성공');
            window.location.replace(ROUTES.HOME);
        },
        onError: (e) => {
            alert('로그인 실패');
            console.error(e);
        },
    });

    // Promise<void> 타입을 만족시키기 위해 명시적으로 래핑x`
    const login = async (signinData: RequestSigninDto): Promise<void> => {
        await useLogin(signinData);
    };

    // const logout = async () => {
    //     try {
    //         await postLogout();

    //         tokenStorage.clear();

    //         setAccessToken(null);
    //         setRefreshToken(null);
    //         setMyInfo(null);

    //         alert('로그아웃되었습니다.');
    //     } catch (error) {
    //         alert('실패');
    //         console.error(error);
    //     }
    // };

    const { mutateAsync: useLogout } = useMutation({
        mutationFn: postLogout,
        onSuccess: () => {
            tokenStorage.clear();

            setAccessToken(null);
            setRefreshToken(null);
            setMyInfo(null);

            alert('로그아웃되었습니다.');
        },
        onError: (e) => {
            alert('로그아웃실패');
            console.error(e);
        },
    });

    const logout = async (): Promise<void> => {
        await useLogout();
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
