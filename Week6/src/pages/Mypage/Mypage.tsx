// src/pages/Mypage.tsx
import { ChangeEvent, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LogoutButton from '../../components/LogoutButton';
import { IMAGE_PATH } from '../../constants/images';
import LpCreateModal from './components/LpCreateModal';
import { postImagePrivate } from '../../apis/image';
import { usePatchUsers } from './hooks/usePatchUsers';

function Mypage() {
    const { myInfo } = useAuth();
    const user = myInfo?.data; // null-safe
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    /* === form state === */
    const [name, setName] = useState(user?.name ?? '');
    const [bio, setBio] = useState(user?.bio ?? '');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState(
        user?.avatar ?? IMAGE_PATH.PROFILE,
    );

    /* 모달 토글 */
    const toggleModal = () => setIsOpenModal((prev) => !prev);

    /* PATCH 훅 */
    const { mutate: patchUser, isPending } = usePatchUsers();

    /* avatar 파일 선택 → 미리보기 */
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    /* 프로필 저장 */
    const handleSave = async () => {
        if (!name.trim()) return; // 이름은 필수

        let avatarUrl = user?.avatar ?? '';

        // 새 이미지 업로드가 있으면 먼저 업로드
        if (avatarFile) {
            const res = await postImagePrivate(avatarFile);
            avatarUrl = res.data.imageUrl;
        }

        patchUser(
            { name: name.trim(), bio: bio.trim(), avatar: avatarUrl },
            {
                onSuccess() {
                    setIsEditing(false);
                },
            },
        );
    };

    /* ‘수정’ 버튼 진입 시 현재 값을 폼에 반영 */
    const startEdit = () => {
        setName(user?.name ?? '');
        setBio(user?.bio ?? '');
        setPreviewUrl(user?.avatar ?? IMAGE_PATH.PROFILE);
        setAvatarFile(null);
        setIsEditing(true);
    };

    /* ‘취소’ */
    const cancelEdit = () => {
        setIsEditing(false);
        setAvatarFile(null);
        setPreviewUrl(user?.avatar ?? IMAGE_PATH.PROFILE);
    };

    /* 로그인 상태가 바뀌면 폼 초기화 */
    useEffect(() => {
        setName(user?.name ?? '');
        setBio(user?.bio ?? '');
        setPreviewUrl(user?.avatar ?? IMAGE_PATH.PROFILE);
    }, [user]);

    return (
        <main className="max-w-xl p-6 mx-auto">
            <h1 className="mb-6 text-2xl font-bold text-center">마이페이지</h1>

            <div className="p-6 bg-white shadow-md rounded-2xl">
                {/* 아바타 + 기본 정보 */}
                <div className="flex items-center gap-4">
                    <img
                        src={previewUrl}
                        alt="사용자 아바타"
                        className="object-cover w-20 h-20 border rounded-full"
                    />
                    {isEditing ? (
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                className="px-2 py-1 text-sm border rounded"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="이름"
                            />
                            <input
                                aria-label="이미지"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="text-xs"
                            />
                        </div>
                    ) : (
                        <div>
                            <p className="text-lg font-semibold">
                                {user?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {user?.email}
                            </p>
                        </div>
                    )}
                </div>

                <hr className="my-4 border-gray-200" />

                {/* 자기소개 */}
                <div>
                    <p className="text-sm text-gray-400">자기소개</p>
                    {isEditing ? (
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={3}
                            className="w-full px-2 py-1 text-sm border rounded resize-none"
                            placeholder="자기소개를 입력하세요."
                        />
                    ) : (
                        <p className="text-base">
                            {user?.bio?.trim() || '자기소개가 없습니다.'}
                        </p>
                    )}
                </div>

                <hr className="my-4 border-gray-200" />

                {/* 가입일 */}
                <div className="flex justify-between text-sm text-gray-500">
                    <span>가입일</span>
                    <span>
                        {new Date(user?.createdAt ?? '').toLocaleDateString(
                            'ko-KR',
                        )}
                    </span>
                </div>

                {/* 우측 하단 공통 버튼 영역 */}
                <div className="flex justify-end gap-3 pt-4">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                disabled={isPending || !name.trim()}
                                className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-40"
                            >
                                저장
                            </button>
                            <button
                                onClick={cancelEdit}
                                disabled={isPending}
                                className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-40"
                            >
                                취소
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={startEdit}
                                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                            >
                                프로필 수정
                            </button>
                            <LogoutButton />
                        </>
                    )}
                </div>

                {/* LP 생성 모달 */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={toggleModal}
                        className="w-8 h-8 text-xl leading-8 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                        title="LP 작성"
                    >
                        +
                    </button>
                </div>
                {isOpenModal && <LpCreateModal setIsOpen={setIsOpenModal} />}
            </div>
        </main>
    );
}

export default Mypage;
