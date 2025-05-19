import CommentItemSkeleton from "./CommentSkeleton";

interface CommentListSkeletonProps {
  count: number;
}

const CommentListSkeleton = ({ count }: CommentListSkeletonProps) => {
  return (
    <>
      {new Array(count).fill(0).map((_, idx) => (
        <CommentItemSkeleton key={idx} />
      ))}
    </>
  );
};

export default CommentListSkeleton;
