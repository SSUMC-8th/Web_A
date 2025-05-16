import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../apis/auth';
import { ResponseMyInfoDto } from '../types/auth';
import { useAuth } from './AuthContext';
import { QUERY_KEY } from '../constants/key';

export const useGetUsers = () => {
    const { accessToken } = useAuth();

    return useQuery<ResponseMyInfoDto>({
        queryKey: [QUERY_KEY.users],
        queryFn: getMyInfo,
        enabled: !!accessToken, // 토큰 있을 때만 실행
        staleTime: 1000 * 60 * 30, // 30분 동안 fresh
        retry: 1, // 실패 시 한 번 재시도
    });
};
