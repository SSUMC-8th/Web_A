import { Heart } from "lucide-react"; 
import { ResponseMyInfoDto } from "../../types/auth";
import { Lp, LpId } from "../../types/lptype";

interface LpLikeButtonProps {
  lpId: LpId;
  me: ResponseMyInfoDto | undefined
  lp: Lp;
  handleLikeLp: ()=>void
  handleDislikeLp:()=>void
}

const LpLikeButton = ({  me, lp, handleDislikeLp, handleLikeLp }: LpLikeButtonProps) => {
  const isLiked = lp.likes.some((like) => like.userId === me?.data.id);

  return (
    <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
      <Heart
        color={isLiked ? "red" : "gray "}
        fill={isLiked ? "red" : "transparent"}
      />
    </button>
  );
};

export default LpLikeButton;
