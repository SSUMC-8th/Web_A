// src/components/Comment/Comments.tsx
import { useState } from "react";
import { commentDetailDto } from "../../types/lp";
import { PAGINATION_ORDER } from "../../enums/pagination";
import CommentItem from "./CommentItem";

export interface CommentsProps {
  comments: commentDetailDto[]; // 댓글 전체 배열
  order: PAGINATION_ORDER; // 현재 정렬 순서
  setOrder: (o: PAGINATION_ORDER) => void; // 정렬 순서 변경 콜백
  onPost: (text: string) => void; // 댓글 등록 콜백
}

const Comments = ({ comments, order, setOrder, onPost }: CommentsProps) => {
  const [input, setInput] = useState("");

  return (
    <section className="mt-12 space-y-6">
      {/* 1. 제목 + 정렬 버튼 */}
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

      {/* 2. 입력창 + 전송 */}
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
            if (text) {
              onPost(text);
              setInput("");
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          작성
        </button>
      </div>

      {/* 3. 댓글 리스트 */}
      <ul className="space-y-0">
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} />
        ))}
      </ul>
    </section>
  );
};

export default Comments;
