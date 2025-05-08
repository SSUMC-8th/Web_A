import { useAuth } from '../../../../context/AuthContext';

function UserMenu() {
    const { logout, myInfo } = useAuth();

    return (
        <div>
            <span className="text-base font-bold text-blue-700">
                {myInfo?.data.name}
            </span>
            <span className="pr-8">님 반갑습니다.</span>
            <button
                onClick={logout}
                className="px-4 py-2 text-white transition-colors duration-100 rounded-md bg-sky-600 hover:bg-sky-400"
            >
                로그아웃
            </button>
        </div>
    );
}

export default UserMenu;
