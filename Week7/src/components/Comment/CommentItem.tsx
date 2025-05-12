import { commentDetailDto } from "../../types/lp";

interface CommentItemProps {
  comment: commentDetailDto;
}

const CommentItem = ({ comment }: CommentItemProps) => (
  <li className="flex items-start space-x-3 py-4 border-b border-zinc-700 last:border-none">
    <img
      src={comment.author.avatar ?? ""}
      alt={comment.author.name}
      className="w-10 h-10 rounded-full object-cover bg-zinc-700"
    />
    <div className="flex-1">
      <p className="text-sm font-medium text-white">{comment.author.name}</p>
      <p className="mt-1 text-sm text-zinc-300">{comment.content}</p>
      <span className="block mt-1 text-xs text-zinc-500">
        {new Date(comment.createdAt).toLocaleString()}
      </span>
    </div>
    <button className="p-2 text-zinc-500 hover:text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 114 0 2 2 0 01-4 0zm-3 0a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </button>
  </li>
);

export default CommentItem;
