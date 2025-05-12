import LpCardSkeleton from "./LpCardSkeleton";

interface LpCardListSkeletonProps {
  count: number;
}

const LpCardListSkeleton = ({ count }: LpCardListSkeletonProps) => {
  return (
    <>
      {new Array(count).fill(0).map((_, idx) => (
        <LpCardSkeleton key={idx} />
      ))}
    </>
  );
};

export default LpCardListSkeleton;
