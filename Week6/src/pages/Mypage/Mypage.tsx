import { useAuth } from '../../context/AuthContext';
import LogoutButton from '../../components/LogoutButton';
import { IMAGE_PATH } from '../../constants/images';
import LpCreateModal from './components/LpCreateModal';
import { useState } from 'react';

function Mypage() {
    const { myInfo } = useAuth();
    const user = myInfo?.data;
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const toggleModal = () => {
        setIsOpenModal((prev) => !prev);
    };

    return (
        <main className="max-w-xl p-6 mx-auto">
            <h1 className="mb-6 text-2xl font-bold text-center">마이페이지</h1>

            <div className="p-6 bg-white shadow-md rounded-2xl">
                <div className="flex items-center gap-4">
                    <img
                        src={user?.avatar ?? IMAGE_PATH.PROFILE}
                        alt="사용자 아바타"
                        className="object-cover w-20 h-20 border rounded-full"
                    />
                    <div>
                        <p className="text-lg font-semibold">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                </div>

                <hr className="my-4 border-gray-200" />

                <div>
                    <p className="text-sm text-gray-400">자기소개</p>
                    <p className="text-base">
                        {user?.bio || '자기소개가 없습니다.'}
                    </p>
                </div>

                <hr className="my-4 border-gray-200" />

                <div className="flex justify-between text-sm text-gray-500">
                    <span>가입일</span>
                    <span>
                        {new Date(user?.createdAt ?? '').toLocaleDateString()}
                    </span>
                </div>

                <div className="flex justify-end pt-4">
                    <LogoutButton />
                </div>

                <button onClick={toggleModal}>+</button>
                {isOpenModal && <LpCreateModal setIsOpen={setIsOpenModal} />}
            </div>
        </main>
    );
}

export default Mypage;
