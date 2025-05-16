import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { RequestSigninDto, ResponseMyInfoDto } from '../types/auth';
import { postLogout, postSignin } from '../apis/auth';
import { tokenStorage } from '../utils/tokenStorage';
import ROUTES from '../constants/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetUsers } from './useGetUsers';
import { QUERY_KEY } from '../constants/key';

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    myInfo: ResponseMyInfoDto | undefined;
    login: (signinData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    myInfo: undefined,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const queryClient = useQueryClient();

    const [accessToken, setAccessToken] = useState<string | null>(
        tokenStorage.getAccessToken(),
    );
    const [refreshToken, setRefreshToken] = useState<string | null>(
        tokenStorage.getRefreshToken(),
    );

    const { data: myInfo } = useGetUsers();

    const { mutateAsync: useLogin } = useMutation({
        mutationFn: postSignin,
        onSuccess: (data) => {
            const newAccessToken = data.data.accessToken;
            const newRefreshToken = data.data.refreshToken;

            tokenStorage.setAccessToken(newAccessToken);
            tokenStorage.setRefreshToken(newRefreshToken);

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.users] });

            alert('로그인 성공');
            window.location.replace(ROUTES.HOME);
        },
        onError: (e) => {
            alert('로그인 실패');
            console.error(e);
        },
    });

    const login = async (signinData: RequestSigninDto): Promise<void> => {
        await useLogin(signinData);
    };

    const { mutateAsync: useLogout } = useMutation({
        mutationFn: postLogout,
        onSuccess: () => {
            tokenStorage.clear();

            setAccessToken(null);
            setRefreshToken(null);

            queryClient.removeQueries({ queryKey: [QUERY_KEY.users] });

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
