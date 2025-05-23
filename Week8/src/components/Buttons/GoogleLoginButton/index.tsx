interface GoogleLoginButtonProps {
  onClick: () => void;
}

const GoogleLoginButton = ({ onClick }: GoogleLoginButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-[300px] p-[10px] max-w-sm space-x-2 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition hover:bg-gray-100"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span className="text-sm font-medium text-gray-700">Google로 로그인</span>
    </button>
  );
};

export default GoogleLoginButton;
