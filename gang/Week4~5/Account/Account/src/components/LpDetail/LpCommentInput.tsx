import { useState } from "react";
import usePostCreateComment from "../../hooks/mutations/usePostCreateComment";

interface LpCommentInputProps {
  lpId: number;
}

const LpCommentInput = ({ lpId }: LpCommentInputProps) => {
  const {mutate} =usePostCreateComment();
  const [commentInput, setCommentInput] = useState<string>("");
const handleAddComment = () => {
  if (commentInput.trim()) {
    try {
      mutate({
        lpId,
        body: { content: commentInput },
      });
      setCommentInput("");
    } catch (error) {
      console.error("댓글 작성 실패", error);
    }
  }
};
  return (
    <div className="flex flex-row gap-2 justify-between">
      <textarea
        placeholder="댓글을 입력해주세요"
        value= {commentInput}
        className="w-full h-12 py-2 px-4 border border-white rounded-xl resize-none placeholder:text-gray-400"
        onChange={(e) => setCommentInput(e.target.value)}
      />
      <button
        className="self-end  h-12 px-4 p-4 bg-gray-300 text-white rounded-xl hover:bg-gray-500 whitespace-nowrap text-sm"
        onClick={handleAddComment}
      >
        작성
      </button>
    </div>
  );
};

export default LpCommentInput;
