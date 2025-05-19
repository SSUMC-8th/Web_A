import { useState } from "react";
import { useParams } from "react-router-dom";
import { commentDetailDto } from "../../types/lp";
import { PAGINATION_ORDER } from "../../enums/pagination";
import CommentItem from "./CommentItem";
import { usePatchComment } from "../../hook/mutations/usePatchComment";
import { useDeleteComment } from "../../hook/mutations/useDeleteComment";
import { useGetMyInfo } from "../../hook/queries/User/useGetMyInfo";
import { useAuth } from "../../context/TokenContext/useAuth";

export interface CommentsProps {
  comments: commentDetailDto[];
  order: PAGINATION_ORDER;
  setOrder: (o: PAGINATION_ORDER) => void;
  onPost: (text: string) => void;
}

const Comments = ({ comments, order, setOrder, onPost }: CommentsProps) => {
  const { accessToken } = useAuth();
  const { lpId } = useParams<{ lpId: string }>();
  const { data } = useGetMyInfo(accessToken);
  const patchComment = usePatchComment();
  const deleteComment = useDeleteComment();

  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const startEdit = (comment: commentDetailDto) => {
    setEditingId(comment.id);
    setEditText(comment.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const submitEdit = () => {
    if (!lpId || editingId === null) return;
    patchComment.mutate({
      lpId: Number(lpId),
      commentId: editingId,
      content: editText,
    });
    cancelEdit();
  };

  const handleDelete = (commentId: number) => {
    if (!lpId) return;
    deleteComment.mutate({ lpId: Number(lpId), commentId });
  };

  if (!data) return null;
  return (
    <section className="mt-12 space-y-6">
      {/* 제목 + 정렬 버튼 */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">댓글</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setOrder(PAGINATION_ORDER.asc)}
            className={`px-3 py-1 rounded-md text-sm ${
              order === PAGINATION_ORDER.asc
                ? "bg-zinc-700 text-white"
                : "bg-zinc-600 text-zinc-300"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
            className={`px-3 py-1 rounded-md text-sm ${
              order === PAGINATION_ORDER.desc
                ? "bg-zinc-700 text-white"
                : "bg-zinc-600 text-zinc-300"
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      {/* 입력창 + 전송 */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="댓글을 입력해주세요"
          className="flex-1 bg-zinc-800 text-white placeholder-zinc-500 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            const text = input.trim();
            if (text && lpId) {
              onPost(text);
              setInput("");
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          작성
        </button>
      </div>

      {/* 댓글 리스트 */}
      <ul className="space-y-0">
        {comments.map((c) => (
          <CommentItem
            key={c.id}
            comment={c}
            myInfo={data}
            isEditing={editingId === c.id}
            editText={editText}
            onEditClick={startEdit}
            onDeleteClick={handleDelete}
            onEditChange={setEditText}
            onEditCancel={cancelEdit}
            onEditSubmit={submitEdit}
          />
        ))}
      </ul>
    </section>
  );
};

export default Comments;
