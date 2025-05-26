import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postSignin } from '@/apis/auth';
import { QUERY_KEY } from '@/constants/key';
import ROUTES from '@/constants/routes';
import { RequestSigninDto } from '@/types/auth';
import { tokenStorage } from '@/utils/tokenStorage';

const useLogin = ({
  setAccessToken,
  setRefreshToken,
}: {
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RequestSigninDto) => postSignin(payload),
    onSuccess: ({ data }) => {
      tokenStorage.setAccessToken(data.accessToken);
      tokenStorage.setRefreshToken(data.refreshToken);

      //Context 상태 업데이트
      //훅에서 useAuth()를 불러오라 했으나, 훅 호출 규칙에 의한 에러가 발생해서 일단 이렇게 해결했습니다.
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.users] });

      alert('환영합니다!');
      window.location.replace(ROUTES.HOME);
    },
    onError: (e) => {
      alert('로그인 실패');
      console.log(e);
    },
  });
};

export default useLogin;
