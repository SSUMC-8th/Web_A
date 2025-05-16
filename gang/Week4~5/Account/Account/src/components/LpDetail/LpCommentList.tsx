import { OrderEnum } from "../../types/common";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useGetInfiniteLpComment from "../../hooks/query/useGetInfiniteLpComment";
import { CommentDetail } from "../../types/comment";
import LpComment from "./LpComment";
import LpCommentSkeleton from "./LpCommentSkeleton";
import LpCommentInput from "./LpCommentInput";
import { LpId } from "../../types/lptype";
import useGetMyInfo from "../../hooks/query/useGetMyInfo";
import ArrangeButton from "../ArrangeButton";

interface LpCommentListProps {
  lpId: LpId;
}

const LpCommentList = ({ lpId }: LpCommentListProps) => {
  //댓글 정렬을 위한 상태 관리
  const [order, setOrder] = useState<OrderEnum>(OrderEnum.ASC);
  const {data:me}= useGetMyInfo();
  const {
    data: comments,
    isLoading,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteLpComment({
    limit: 20,
    order,
    lpId: lpId,
  });

  //무한 로딩을 위한 useInView 훅
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);
  if (!me && isLoading) {
    return (
      <div className="flex flex-col gap-2 px-2">
        <LpCommentSkeleton length={10} />
      </div>
    );
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
      <LpCommentInput lpId={lpId} />
      <div className="flex flex-col p-4">
        {comments?.pages
          ?.map((page) => page.data.data)
          ?.flat()
        ?.map((comment: CommentDetail) => (
            <div key={comment.id} className="relative mb-4">
              <LpComment comment={comment} userId = {Number(me?.data.id)} />
            </div>
          ))}
      </div>
      <div ref={ref} className="flex flex-col gap-2 px-2">
        {isFetching && <LpCommentSkeleton length={10} />}
      </div>
    </div>
  );
};

export default LpCommentList;
