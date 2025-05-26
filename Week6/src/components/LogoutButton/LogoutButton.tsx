import useLogout from '@/features/auth/hooks/useLogout';

function LogoutButton() {
  const { mutate } = useLogout();

  const handleLogout = () => {
    mutate();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-white transition-colors duration-100 rounded-md bg-sky-600 hover:bg-sky-400"
    >
      로그아웃
    </button>
  );
}

export default LogoutButton;
