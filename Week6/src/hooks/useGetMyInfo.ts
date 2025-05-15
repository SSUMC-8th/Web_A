import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../apis/auth';
import { useAuth } from '../context/AuthContext';

export const useGetMyInfo = () => {
    const { myInfo } = useAuth();
    return useQuery({
        queryKey: ['users'],
        queryFn: getMyInfo,
        initialData: myInfo,
        staleTime: 1000 * 60 * 5,
        enabled: !!myInfo,
    });
};
