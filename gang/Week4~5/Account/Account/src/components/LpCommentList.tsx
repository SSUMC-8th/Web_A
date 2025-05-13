import { useParams } from "react-router-dom";
import ArrangeButton from "./LpBoard/ArrangeButton";
import { OrderEnum } from "../types/common";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useGetInfiniteLpComment from "../hooks/query/useGetInfiniteLpComment";
import { CommentDetail } from "../types/commenttype";
import LpComment from "./LpComment";
import LpCommentSkeleton from "./LpDetail/LpCommentSkeleton";

const LpCommentList = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const parsedLpId = Number(lpId);
  const [order, setOrder] = useState<OrderEnum>(OrderEnum.ASC);
  const {
    data: comments,
    isLoading,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteLpComment({
    limit: 20,
    order: OrderEnum.ASC,
    lpId: parsedLpId,
  });
  
  const { ref, inView } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);
  if(isLoading){
    return(
          <div className="flex flex-col gap-2 px-2">
          {Array.from({ length: 10 }).map((_, idx) => (
            <LpCommentSkeleton key={idx} />
          ))}
        </div>
        )
      }
      if (isError) {
        console.error(isError);
        return <div className="text-red-500">에러 발생!</div>;
      }
  return (
    <div>
      <div className="flex flex-row justify-between p-4">
        <h1>댓글</h1>
        <ArrangeButton order={order} setOrder={setOrder}></ArrangeButton>
      </div>
      <div className="flex flex-row gap-2 px-4">
        <textarea
          placeholder="댓글을 입력해주세요"
          className="w-full h-12 py-2 px-4 border border-white rounded-xl resize-none placeholder:text-gray-400"
        />
        <button className="self-end  h-12 px-4 p-4 bg-gray-300 text-white rounded-xl hover:bg-gray-500 whitespace-nowrap text-sm">
          작성
        </button>
      </div>
      <div className="flex flex-col p-4 m-3">
        {comments?.pages
          ?.map((page) => page.data)
          ?.flat()
          ?.map((comment: CommentDetail) => (
            <div key={comment.id} className="relative">
              <LpComment comment={comment} />
            </div>
          ))}
      </div>
      <div ref={ref} className="flex flex-col gap-2 px-2">  
            {isFetching && Array.from({ length: 10 }).map((_, idx) => <LpCommentSkeleton key={idx} />)}
          </div>  
    </div>
  );
};

export default LpCommentList;
