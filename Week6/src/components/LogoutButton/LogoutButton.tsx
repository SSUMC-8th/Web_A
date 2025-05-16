import { useAuth } from '../../context/AuthContext';

function LogoutButton() {
    const { logout } = useAuth();

    return (
        <button
            onClick={logout}
            className="px-4 py-2 text-white transition-colors duration-100 rounded-md bg-sky-600 hover:bg-sky-400"
        >
            로그아웃
        </button>
    );
}

export default LogoutButton;
