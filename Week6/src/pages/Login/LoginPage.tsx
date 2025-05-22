import { useNavigate } from 'react-router-dom';

import { useAuth } from '#/context/AuthContext';
import useLogin from '#/features/auth/hooks/useLogin';

import GoogleLoginButton from './components/GoogleLoginButton';
import LoginForm from './components/LoginForm';

function LoginPage() {
  const { accessToken, setAccessToken, setRefreshToken } = useAuth();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  if (accessToken) {
    navigate('/');
    return null;
  }

  return (
    <main className="relative flex justify-center">
      <div className="absolute flex flex-col items-center gap-2 text-center w-80 top-8">
        <div className="relative flex items-center justify-center w-full">
          <button onClick={goBack} className="absolute left-2">
            {'<'}
          </button>
          <h2>로그인</h2>
        </div>

        <GoogleLoginButton />

        <p>OR</p>

        <LoginForm
          mutate={useLogin({ setAccessToken, setRefreshToken }).mutate}
        />
      </div>
    </main>
  );
}

export default LoginPage;
