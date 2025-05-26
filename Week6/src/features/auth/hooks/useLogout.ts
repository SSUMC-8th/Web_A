import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postLogout } from '@/apis/auth';
import { QUERY_KEY } from '@/constants/key';
import { useAuth } from '@/context/AuthContext';
import { tokenStorage } from '@/utils/tokenStorage';

const useLogout = () => {
  const queryClient = useQueryClient();
  const { setAccessToken, setRefreshToken } = useAuth();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      tokenStorage.clear();

      setAccessToken(null);
      setRefreshToken(null);

      queryClient.removeQueries({ queryKey: [QUERY_KEY.users] });

      alert('로그아웃되었습니다.');
    },
    onError: () => {
      alert('로그아웃실패');
    },
  });
};

export default useLogout;
