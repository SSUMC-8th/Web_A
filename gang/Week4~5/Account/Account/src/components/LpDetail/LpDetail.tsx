import { useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../../hooks/query/useGetLpDetail";
import LoadingSpinner from "../LoadingSpinner";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Pencil, Trash } from "lucide-react";
import RotatingThumbnail from "./RotatingThumbnail";
import LpCommentList from "./LpCommentList";
import LpLikeButton from "./LpLikeButton";
import usePostLike from "../../hooks/mutations/usePostLike";
import useDeleteLike from "../../hooks/mutations/useDeleteLike";
import useGetMyInfo from "../../hooks/query/useGetMyInfo";
import usePatchLp from "../../hooks/mutations/usePatchLp";
import useDeleteLp from "../../hooks/mutations/useDeleteLp";
import { Tags } from "../../types/lptype";

const LpDetail = () => {
  const { mutate: patchLp } = usePatchLp();
  const { mutate: deleteLp } = useDeleteLp();

  //파라미터에서 lpId를 가져옴
  const { lpId } = useParams<{ lpId: string }>();
  const parsedLpId = Number(lpId);
  const navigate = useNavigate();
  const { username } = useAuth();
  const [showComments, setShowComments] = useState(false);

  function getRelativeTime(date: Date) {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
  } //상대 시간 계산 함수
  useEffect(() => {
    if (!lpId || isNaN(parsedLpId)) {
      navigate(-1);
    }
  }, [lpId, parsedLpId, navigate]);

  const { data: lp, isLoading, error } = useGetLpDetail(parsedLpId);
  const { data: me } = useGetMyInfo();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState<Tags[]>([]);
  const [published, setPublished] = useState<boolean>(false);

  useEffect(() => {
    if (lp?.data) {
      setTitle(lp.data.title);
      setContent(lp.data.content);
      setThumbnail(lp.data.thumbnail);
      setTags(lp.data.tags);
      setPublished(lp.data.published);
    }
  }, [lp]);

  //lp좋아요 버튼

  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();
  const handleLikeLp = () => {
    likeMutate(parsedLpId);
  };
  const handleDislikeLp = () => {
    dislikeMutate(parsedLpId);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate(-1); // 배경 클릭 시 닫기
    }
  };
  // 수정 완료 핸들러
  const handleUpdateLp = () => {
  patchLp({
    lpId: parsedLpId,
    body: {
      title: title,
      content: content,
      thumbnail: thumbnail,
      tags: tags.map((tag) => tag.name), 
      published,
    },
  }, {
    onSuccess: () => {
      setIsEditing(false);
      alert("수정 완료되었습니다!");
    },
  });
};

  // 삭제 핸들러
  const handleDeleteLp = () => {
    deleteLp(parsedLpId, {
      onSuccess: () => {
        navigate("/mypage");
      },
    });
  };
  if (isLoading || !lp) {
    return <LoadingSpinner />;
  }
  if (error) {
    console.error(error);
    return <div className="text-red-500">에러 발생!</div>;
  }

  return (
    <div
      className="flex flex-col inset-40 z-50 bg-black/80 items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-700 rounded-xl max-w-2xl w-full p-6 shadow-lg relative text-white">
        <div className="flex flex-row justify-between text-white px-5 py-3">
          <h1 className="font-bold text-2xl">{username}</h1>
          <p>{getRelativeTime(lp.data.updatedAt)}</p>
        </div>

        <div className="flex flex-col items-center justify-center px-5">
          <div className="w-full flex flex-row justify-between">
            {isEditing ? (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-black p-2 rounded w-full"
              />
            ) : (
              <h2 className="text-2xl font-bold">{lp.data.title}</h2>
            )}

            <div className="flex flex-row gap-2 ml-2">
              {isEditing ? (
                <button
                  onClick={handleUpdateLp}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  완료
                </button>
              ) : (
                <Pencil
                  className="w-5 h-5 text-gray-300 cursor-pointer"
                  onClick={() => setIsEditing(true)}
                />
              )}
              <Trash
                className="w-5 h-5 text-gray-300 cursor-pointer"
                onClick={handleDeleteLp}
              />
            </div>
          </div>

          {/* 썸네일 */}
          {isEditing ? (
            <input
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="text-black p-2 rounded w-full"
            />
          ) : (
            <RotatingThumbnail imageUrl={lp.data.thumbnail} />
          )}

          {/* 내용 */}
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="text-black p-2 rounded w-full mt-4"
            />
          ) : (
            <p className="line-clamp-2 text-sm text-gray-300">
              {lp.data.content}
            </p>
          )}

          {/* 태그 */}
          <div className="flex flex-row flex-wrap gap-2 mt-4">
            {lp.data.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs bg-gray-700 rounded-full px-2 py-1"
              >
                #{tag.name}
              </span>
            ))}
          </div>

          {/* 댓글/좋아요 */}
          <div className="flex flex-row justify-between mt-4 w-full">
            <button
              type="button"
              className="text-sm p-2 rounded-2xl bg-gray-700 text-white hover:bg-gray-800"
              onClick={() => setShowComments((prev) => !prev)}
            >
              💬 댓글 {showComments ? "닫기" : "열기"}
            </button>
            <LpLikeButton
              lpId={parsedLpId}
              me={me}
              lp={lp.data}
              handleLikeLp={handleLikeLp}
              handleDislikeLp={handleDislikeLp}
            />
          </div>

          {/* 댓글 목록 */}
          {showComments && (
            <div className="mt-4 border-t border-gray-500 pt-4 w-full">
              <LpCommentList lpId={parsedLpId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default LpDetail;
