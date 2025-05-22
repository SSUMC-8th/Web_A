import { API_AUTH } from '#/constants/api';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + API_AUTH.GOOGLE_LOGIN;
  };

  return (
    <button
      className="box-border relative flex items-center justify-center w-full p-2 overflow-hidden border-2 rounded-md"
      onClick={handleGoogleLogin}
    >
      <img
        alt="google-logo"
        src="/google-logo.png"
        className="absolute w-8 contain left-2"
      />
      구글 로그인
    </button>
  );
};

export default GoogleLoginButton;
