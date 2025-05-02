import { useEffect, useState } from 'react';
import { getMyInfo } from '../apis/auth';
import { ResponseMyInfoDto } from '../types/auth';
import { useAuth } from '../context/AuthContext';

function Mypage() {
    const { logout } = useAuth();

    const [myInfo, setMyInfo] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getMyInfo();
                setMyInfo(response);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, []);

    const handleLogout = async () => {
        await logout();
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
