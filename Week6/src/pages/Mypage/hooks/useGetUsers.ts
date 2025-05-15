import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../../../apis/auth';
import { ResponseMyInfoDto } from '../../../types/auth';

export const useGetUsers = () => {
    return useQuery<ResponseMyInfoDto>({
        queryKey: ['users'],
        queryFn: getMyInfo,
        staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
        retry: 1, // 실패 시 한 번 재시도
    });
};
