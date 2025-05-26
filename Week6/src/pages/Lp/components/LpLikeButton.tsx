import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';

type LpLikeButtonProps = {
  isLiked: boolean;
  likeCount: number;
  onToggle: () => void;
};

function LpLikeButton({ isLiked, likeCount, onToggle }: LpLikeButtonProps) {
  return (
    <button onClick={onToggle} className="flex items-center gap-1 mt-4 text-lg">
      {isLiked ? <HiHeart className="text-red-500" /> : <HiOutlineHeart />}
      <span>{likeCount}</span>
    </button>
  );
}

export default LpLikeButton;
