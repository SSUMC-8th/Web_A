import { useQuery } from '@tanstack/react-query';

import { getUsers } from '@/apis/users';
import { QUERY_KEY } from '@/constants/key';
import { useAuth } from '@/context/AuthContext';
import { ResponseGetUsersDto } from '@/types/users';

export const useGetUsers = () => {
  const { accessToken } = useAuth();

  return useQuery<ResponseGetUsersDto>({
    queryKey: [QUERY_KEY.users],
    queryFn: getUsers,
    enabled: !!accessToken, // 토큰 있을 때만 실행
    staleTime: 1000 * 60 * 30, // 30분 동안 fresh
    retry: 1, // 실패 시 한 번 재시도
  });
};
