import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';

import { getLpDetail } from '../../apis/lp';
import { postImagePrivate } from '../../apis/image';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import Comments from './components/comments';
import { usePatchLp } from './hooks/usePatchLp';
import { useDeleteLp } from './hooks/useDeleteLp';
import { useAuth } from '../../context/AuthContext';
import ROUTES from '../../constants/routes';
import { useToggleLike } from './hooks/useToggleLike';

function Lp() {
    /* ──────────────── 1) 기본 훅 · 파라미터 */
    const navigate = useNavigate();
    const { myInfo } = useAuth();
    const { lpId } = useParams<{ lpId: string }>();
    const id = Number(lpId);

    /* ──────────────── 2) React Query – 데이터 */
    const { data, isPending, isError } = useQuery({
        queryKey: ['lpDetail', id],
        queryFn: () => getLpDetail(id),
        enabled: Number.isFinite(id),
    });

    /* ──────────────── 3) React Query – 변이 */
    const { mutate: patchLp } = usePatchLp();
    const { mutate: deleteLp } = useDeleteLp();
    const { mutate: toggleLike } = useToggleLike();

    /* ──────────────── 4) 컴포넌트 상태 (편집용) */
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState('');

    /* ──────────────── 5) early-return : 유효성·로딩·에러 */
    if (!Number.isFinite(id)) return <ErrorMessage />;
    if (isPending) return <LoadingSpinner />;
    if (isError || !data?.data) return <ErrorMessage />;

    /* ──────────────── 6) 파싱한 LP 데이터 */
    const lp = data.data;
    const isMyLp = lp.authorId === myInfo?.data.id;
    const alreadyLiked = lp.likes.some((u) => u.userId === myInfo?.data.id);

    /* 편집 상태 초기화 (첫 edit 클릭 시) */
    const startEdit = () => {
        setIsEditing(true);
        setTitle(lp.title);
        setContent(lp.content);
        setPreviewUrl(lp.thumbnail);
        setFile(null);
    };

    /* ──────────────── 7) 핸들러 함수 */
    const handleDeleteLp = () => {
        deleteLp(lp.id, {
            onSuccess: () => navigate(ROUTES.HOME),
        });
    };

    const handleToggleLike = () => {
        toggleLike({ lpId: id, isLiked: alreadyLiked ?? false });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setFile(f);
        //미리보기 url 생성 함수. revokeObjectURL로 해제해줘야 함
        setPreviewUrl(URL.createObjectURL(f));
    };

    const handleEditSubmit = async () => {
        let thumbnailUrl = lp.thumbnail;
        if (file) {
            const res = await postImagePrivate(file);
            thumbnailUrl = res.data.imageUrl;
        }

        patchLp(
            {
                lpId: lp.id,
                title: title.trim(),
                content: content.trim(),
                thumbnail: thumbnailUrl,
                tags: lp.tags.map((tag) => tag.name), // 기존 태그 유지
                published: true,
            },
            {
                onSuccess: () => setIsEditing(false),
            },
        );
    };

    return (
        <main className="flex flex-col items-center gap-8 px-4 pb-12">
            <article className="w-full max-w-3xl p-6 bg-white shadow-md rounded-xl">
                {isMyLp && (
                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    className="px-3 py-2 font-semibold text-white bg-blue-500 rounded-md"
                                    onClick={handleEditSubmit}
                                >
                                    수정 완료
                                </button>
                                <button
                                    className="px-3 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md"
                                    onClick={() => setIsEditing(false)}
                                >
                                    취소
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="px-3 py-2 font-semibold text-blue-500 border border-blue-500 rounded-md"
                                    onClick={startEdit}
                                >
                                    수정
                                </button>
                                <button
                                    className="px-3 py-2 font-semibold text-white bg-red-500 rounded-md"
                                    onClick={handleDeleteLp}
                                >
                                    삭제
                                </button>
                            </>
                        )}
                    </div>
                )}

                <div className="flex justify-center mt-4">
                    <div className="relative flex items-center justify-center rounded-full h-80 w-80">
                        <img
                            src={previewUrl || lp.thumbnail}
                            alt={title || lp.title}
                            className="object-cover rounded-full shadow-inner aspect-square animate-spin-slow"
                        />
                    </div>
                </div>

                {isEditing ? (
                    <input
                        aria-label="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 mt-6 text-3xl font-bold text-center border rounded-md"
                    />
                ) : (
                    <h1 className="mt-6 text-3xl font-bold text-center text-gray-800">
                        {lp.title}
                    </h1>
                )}

                <p className="mt-1 text-sm text-center text-gray-500">
                    {new Date(lp.createdAt).toLocaleDateString()}
                </p>

                {isEditing ? (
                    <textarea
                        aria-label="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-48 px-4 py-2 mt-6 border rounded-md resize-y"
                    />
                ) : (
                    <p className="mt-6 text-base leading-7 text-gray-700 whitespace-pre-line">
                        {lp.content}
                    </p>
                )}

                {isEditing && (
                    <input
                        aria-label="파일"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-4"
                    />
                )}

                {!isEditing && (
                    <button
                        onClick={handleToggleLike}
                        className="flex items-center gap-1 mt-4 text-lg"
                    >
                        {alreadyLiked ? (
                            <HiHeart className="text-red-500" />
                        ) : (
                            <HiOutlineHeart />
                        )}
                        <span>{lp.likes.length}</span>
                    </button>
                )}
            </article>

            <section className="w-full max-w-3xl">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                    댓글
                </h2>
                <div className="bg-white shadow-md rounded-xl max-h-[32rem] overflow-y-auto">
                    <Comments lpId={lp.id} />
                </div>
            </section>
        </main>
    );
}

export default Lp;
