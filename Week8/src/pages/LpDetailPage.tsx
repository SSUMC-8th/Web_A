import { useEffect, useState } from "react";
import { useGetLpDetail } from "../hook/queries/Lp/useGetDetailLp";
import { useNavigate, useParams } from "react-router-dom";
import { HiPencil, HiTrash, HiCheck, HiX } from "react-icons/hi";
import Comments from "../components/Comment/CommentSection";
import useGetInfiniteComment from "../hook/queries/Lp/useGetInfiniteComment";
import { PAGINATION_ORDER } from "../enums/pagination";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../components/LoadingSpinner";
import CommentListSkeleton from "../components/Comment/CommentListSkeleton";
import { useAuth } from "../context/TokenContext/useAuth";
import { useGetMyInfo } from "../hook/queries/User/useGetMyInfo";
import { Heart } from "lucide-react";
import { usePostLike } from "../hook/mutations/usePostLike";
import { useDeleteLike } from "../hook/mutations/useDeleteLike";
import { useCreateComment } from "../hook/mutations/useCreateComment";
import { usePatchLp } from "../hook/mutations/usePatchLp";
import { useLpImageUpload } from "../hook/queries/Lp/useLpImageUpload";
import { uploadAvatar } from "../api/Post/upload";
import { useDeleteLp } from "../hook/mutations/useDeleteLp";

const LpDetailPage = () => {
  const { accessToken } = useAuth();
  const { lpId } = useParams<{ lpId: string }>();
  const lpIdNum = Number(lpId);
  const navigate = useNavigate();

  // 조회
  const { data: lpResponse } = useGetLpDetail(lpIdNum);
  const { data: userData } = useGetMyInfo(accessToken);

  // 댓글 무한 스크롤
  const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(
    PAGINATION_ORDER.desc
  );
  const {
    data: commentResponse,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
  } = useGetInfiniteComment(lpIdNum, 5, sortOrder);
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView && !isFetching && hasNextPage) fetchNextPage();
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const allComments = commentResponse?.pages.flatMap((p) => p.data.data) || [];
  const { mutate: createComment } = useCreateComment();
  const handlePost = (text: string) =>
    createComment({ lpId: lpIdNum, content: text });
  const handleOrder = (o: PAGINATION_ORDER) => setSortOrder(o);

  // 좋아요
  const isLiked = lpResponse?.data.likes.some(
    (like) => like.userId === userData?.data.id
  );
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();
  const handleLikeLP = () => likeMutate({ lpId: lpIdNum });
  const handleDisLikeLp = () => disLikeMutate({ lpId: lpIdNum });

  // 편집 모드
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedTags, setEditedTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  const { mutateAsync: patchLp } = usePatchLp();

  // 이미지 업로드 훅
  const {
    file: imageFile,
    previewUrl,
    inputRef,
    triggerFileSelect,
    onFileChange,
  } = useLpImageUpload();

  // 원본 데이터 세팅
  useEffect(() => {
    if (lpResponse?.data && isEditing) {
      const d = lpResponse.data;
      setEditedTitle(d.title);
      setEditedContent(d.content);
      setEditedTags(d.tags.map((t) => t.name));
      setThumbnail(d.thumbnail);
    }
  }, [lpResponse, isEditing]);

  // 이미지 파일이 선택되면 업로드
  useEffect(() => {
    (async () => {
      if (imageFile) {
        try {
          setError("");
          const uploadedUrl = await uploadAvatar(imageFile);
          setThumbnail(uploadedUrl);
        } catch (err) {
          console.error("이미지 업로드 실패:", err);
          setError("이미지 업로드에 실패했습니다.");
        }
      }
    })();
  }, [imageFile]);

  const handleSave = async () => {
    try {
      await patchLp({
        lpId: lpIdNum,
        body: {
          title: editedTitle,
          content: editedContent,
          tags: editedTags,
          thumbnail,
          published: lpResponse?.data.published ?? true,
        },
      });
      setIsEditing(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => setIsEditing(false);

  const { mutateAsync: deleteLpMutate } = useDeleteLp();

  const handleDelete = async () => {
    try {
      await deleteLpMutate({ lpId: lpIdNum });
      navigate("/");
    } catch (e) {
      console.error("삭제 실패:", e);
    }
  };

  return (
    <main className="flex-1 min-h-screen bg-zinc-900 overflow-y-auto py-8 px-4">
      <div className="max-w-3xl mx-auto bg-zinc-800 rounded-2xl shadow-2xl py-8 px-20 space-y-4 text-white">
        {/* 헤더 */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <img
              src={userData?.data.avatar || ""}
              alt="user"
              className="w-10 h-10 rounded-full border-2 border-zinc-700"
            />
            <span className="text-base font-medium">{userData?.data.name}</span>
          </div>
          <span className="text-sm text-zinc-400">
            {new Date(lpResponse?.data.createdAt || "").toLocaleDateString()}
          </span>
        </div>

        {/* 제목 & 버튼 */}
        <div className="flex justify-between items-center">
          {isEditing ? (
            <input
              className="flex-1 bg-zinc-700 rounded px-3 py-2 text-white text-xl font-bold"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <h1 className="text-xl font-bold">{lpResponse?.data.title}</h1>
          )}
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-1 hover:text-white/80"
                >
                  <HiCheck className="text-2xl" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1 hover:text-white/80"
                >
                  <HiX className="text-2xl" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:text-white/80"
                >
                  <HiPencil className="text-2xl" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 hover:text-white/80"
                >
                  <HiTrash className="text-2xl" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* CD 이미지 카드 */}
        <div className="relative w-full aspect-square max-w-md mx-auto rounded-xl overflow-hidden">
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            className="hidden"
            onChange={onFileChange}
          />
          <div
            onClick={isEditing ? triggerFileSelect : undefined}
            className="absolute inset-0 rounded-xl p-5 shadow-[inset_0_5px_10px_rgba(0,0,0,0.8)] cursor-pointer"
          >
            <img
              src={previewUrl || thumbnail || lpResponse?.data.thumbnail}
              alt="lp-thumbnail"
              className="w-full h-full object-cover rounded-full animate-spin-slow"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-zinc-900 border-4 border-zinc-700 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />
        </div>
        {error && <p className="text-red-400 text-center">{error}</p>}

        {/* 내용 */}
        {isEditing ? (
          <textarea
            className="w-full bg-zinc-700 rounded p-3 text-sm text-zinc-100"
            rows={4}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p className="flex items-center justify-center text-sm text-zinc-300 leading-relaxed">
            {lpResponse?.data.content}
          </p>
        )}

        {/* 태그 */}
        <div className="flex flex-wrap gap-2">
          {isEditing ? (
            <input
              className="flex-1 bg-zinc-700 rounded px-3 py-1 text-xs text-white"
              placeholder="쉼표로 구분하여 입력"
              value={editedTags.join(",")}
              onChange={(e) =>
                setEditedTags(
                  e.target.value.split(",").map((tag) => tag.trim())
                )
              }
            />
          ) : (
            lpResponse?.data.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-zinc-700 text-xs rounded-full"
              >
                #{tag.name}
              </span>
            ))
          )}
        </div>

        {/* 좋아요 */}
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={isLiked ? handleDisLikeLp : handleLikeLP}
            className="text-2xl text-pink-500 hover:scale-110 transform transition"
          >
            <Heart
              color={isLiked ? "red" : "black"}
              fill={isLiked ? "red" : "transparent"}
            />
          </button>
          <span className="ml-2 text-lg">{lpResponse?.data.likes.length}</span>
        </div>
      </div>

      {/* 댓글 섹션 */}
      {isPending && <CommentListSkeleton count={20} />}
      <Comments
        comments={allComments}
        order={sortOrder}
        setOrder={handleOrder}
        onPost={handlePost}
      />
      {isFetching && <CommentListSkeleton count={20} />}
      <div ref={ref}>
        {isFetching && (
          <div className="flex justify-center items-center mt-4">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </main>
  );
};

export default LpDetailPage;
