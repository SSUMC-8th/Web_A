import { useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../../hooks/query/useGetLpDetail";
import LoadingSpinner from "../LoadingSpinner";
import { useEffect, useState } from "react";
import { Tags } from "../../types/lptype";
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


const LpDetail = () => {
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

  const { data:lp, isLoading, error } = useGetLpDetail(parsedLpId);
  const {data:me}=useGetMyInfo();

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

  if (isLoading || !lp) {
    return <LoadingSpinner />;
  }
  if (error) {
    console.error(error);
    return <div className="text-red-500">에러 발생!</div>;
  }







  return (
    <div
      className="flex flex-col inset-40 z-50 bg-black/80 items-center justify-center "
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-700 rounded-xl max-w-2xl w-full p-6 shadow-lg relative text-white">
        <div className="flex flex-row justify-between text-white px-5 py-3">
          <h1 className="font-bold text-2xl">{username}</h1>
          <p>{getRelativeTime(lp.data.updatedAt)}</p>
        </div>
        <div className="flex flex-col items-center justify-center px-5">
          <div className="w-full flex flex-row justify-between ">
            <h2 className="text-2xl font-bold">{lp.data.title}</h2>
            <div className="flex flex-row gap-2">
              <Pencil
                className="w-5 h-5 text-gray-300 cursor-pointer"
                onClick={() => navigate(`/lps/${lp.data.id}/edit`)}
              />
              <Trash
                className="w-5 h-5 text-gray-300 cursor-pointer"
                onClick={() => navigate(`/lps/${lp.data.id}/delete`)}
              />
            </div>
          </div>
          <div className="flex-1/3 flex items-center justify-between p-10 m-10 shadow-2xl shadow-black rounded-lg bg-gray-700">
            <div className="items-center justify-between mb-4 w-full aspect-square">
            <RotatingThumbnail imageUrl={lp.data.thumbnail} />
            </div>
          </div>
          <p className="line-clamp-2 text-sm text-gray-300">{lp.data.content}</p>
        </div>
        <div className=" flex flex-row justify-between mt-4">
          {lp.data.tags.map((tag: Tags) => (
            <span
              key={tag.id}
              className="text-xs bg-gray-700 rounded-full px-2 py-1 mr-2 mb-2"
            >
              #{tag.name}
            </span>
          ))}
        </div>
        <div className= "flex flex-row justify-between ">
          
          <button
            type="button"
            className="text-sm p-2 rounded-2xl bg-gray-700 text-white hover:bg-gray-800 "
            onClick={() => setShowComments((prev) => !prev)}
          >
            💬 댓글 {showComments ? "닫기" : "열기"}
          </button>
          <LpLikeButton lpId={parsedLpId} me={me} lp={lp.data} handleLikeLp= {handleLikeLp} handleDislikeLp={handleDislikeLp}/>
         {/* <button onClick={isLiked ? handleDisLikeLp : handleLikeLp}>
      <Heart
        color={isLiked ? "red" : "gray "}
        fill={isLiked ? "red" : "transparent"}
      />
    </button> */}
        </div>

        {showComments && (
          <div className="mt-4 border-t border-gray-500 pt-4">
            <LpCommentList lpId= {parsedLpId}/>
            </div>
        )}
        </div>
      </div>
  );
};

export default LpDetail;
