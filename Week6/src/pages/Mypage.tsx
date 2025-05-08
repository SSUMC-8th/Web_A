import { useAuth } from '../context/AuthContext';
import ROUTES from '../constants/routes';
import { useNavigate } from 'react-router-dom';

function Mypage() {
    const { myInfo, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate(ROUTES.HOME);
    };

    return (
        <main className="p-4">
            <h1 className="mb-4 text-xl font-bold">마이페이지</h1>

            <div className="space-y-2">
                <p>이메일: {myInfo?.data.email}</p>
                <p>닉네임: {myInfo?.data.name}</p>
            </div>

            <button
                onClick={handleLogout}
                className="p-4 text-white bg-blue-400 rounded-lg hover:bg-blue-700"
            >
                로그아웃
            </button>
        </main>
    );
}

export default Mypage;
