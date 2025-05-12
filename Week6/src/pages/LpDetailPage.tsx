import { useEffect, useState } from "react";
import { getMyInfo } from "../api/Get/users";
import { ResponseMyInfoDto } from "../types/auth";
import { useGetLpDetail } from "../hook/queries/Lp/useGetDetailLp";
import { useParams } from "react-router-dom";
import { HiPencil, HiTrash } from "react-icons/hi";
import Comments from "../components/Comment/CommentSection";
import useGetInfiniteComment from "../hook/queries/Lp/useGetInfiniteComment";
import { PAGINATION_ORDER } from "../enums/pagination";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../components/LoadingSpinner";
import CommentListSkeleton from "../components/Comment/CommentListSkeleton";

const LpDetailPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto>();

  const [sortOrder, setSortOrder] = useState<
    PAGINATION_ORDER.asc | PAGINATION_ORDER.desc
  >(PAGINATION_ORDER.asc);

  const { id } = useParams();
  const lpId = Number(id);
  console.log(lpId);
  const { data: lpResponse } = useGetLpDetail(lpId);

  useEffect(() => {
    const getData = async () => {
      const reponse = await getMyInfo();
      setData(reponse);
    };

    getData();
  }, []);

  const {
    data: commentResponse,
    refetch: refetchComments,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
  } = useGetInfiniteComment(lpId, 5, sortOrder);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handlePost = async (text: string) => {
    // 댓글 등록 API 호출 …
    // await postComment(lpId, text);
    console.log(text);
    refetchComments();
  };

  // 정렬만 바꿔도 useGetInfiniteComment가 재실행되도록
  const handleOrder = (o: PAGINATION_ORDER) => {
    setSortOrder(o);
  };

  // 모든 페이지의 댓글을 하나의 배열로 합치기
  const allComments =
    commentResponse?.pages.flatMap((page) => page.data.data) || [];

  console.log("Comment", commentResponse);

  return (
    <main className="flex-1 min-h-screen bg-zinc-900 overflow-y-auto py-8 px-4">
      {/* 가운데 고정 컨테이너 */}
      <div className="max-w-3xl mx-auto bg-zinc-800 rounded-2xl shadow-2xl py-8 px-20 space-y-2 text-white">
        {/* 헤더: 왼쪽 프로필 · 오른쪽 날짜 + 수정/삭제 */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <img
              src={data?.data.avatar ?? ""}
              alt="user"
              className="w-10 h-10 rounded-full border-2 border-zinc-700"
            />
            <span className="text-base font-medium">{data?.data.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">
              {new Date(lpResponse?.data.createdAt || "").toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* 제목 */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-bold">{lpResponse?.data.title}</h1>
          </div>
          <div className="flex">
            <button className="p-1 hover:text-white/80">
              <HiPencil className="text-xl" />
            </button>
            <button className="p-1 hover:text-white/80">
              <HiTrash className="text-xl" />
            </button>
          </div>
        </div>

        {/* CD 이미지 카드 */}
        <div className="relative w-full aspect-square max-w-md mx-auto rounded-xl overflow-hidden">
          <div className="absolute inset-0 rounded-xl p-5 shadow-[inset_0_5px_10px_rgba(0,0,0,0.8)]">
            <img
              src={lpResponse?.data.thumbnail}
              alt="lp-thumbnail"
              className="w-full h-full object-cover rounded-full animate-spin-slow"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-zinc-900 border-4 border-zinc-700 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />
        </div>

        {/* 설명 */}
        <p className="text-sm text-zinc-300 leading-relaxed">
          {lpResponse?.data.content}
        </p>

        {/* 해시태그 */}
        <div className="flex flex-wrap gap-2">
          {lpResponse?.data.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-zinc-700 text-xs rounded-full"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* 좋아요 */}
        <div className="flex justify-center items-center mt-4">
          <button className="text-2xl text-pink-500 hover:scale-110 transform transition">
            ❤️
          </button>
          <span className="ml-2 text-lg">{lpResponse?.data.likes.length}</span>
        </div>
      </div>
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
