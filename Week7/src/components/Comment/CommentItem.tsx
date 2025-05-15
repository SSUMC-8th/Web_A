import { commentDetailDto } from "../../types/lp";
import { HiPencil, HiTrash, HiCheck, HiX } from "react-icons/hi";
import { ResponseMyInfoDto } from "../../types/auth";

export interface CommentItemProps {
  comment: commentDetailDto;
  isEditing: boolean;
  editText: string;
  myInfo: ResponseMyInfoDto;
  onEditClick: (comment: commentDetailDto) => void;
  onDeleteClick: (commentId: number) => void;
  onEditChange: (text: string) => void;
  onEditCancel: () => void;
  onEditSubmit: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  isEditing,
  editText,
  myInfo,
  onEditClick,
  onDeleteClick,
  onEditChange,
  onEditCancel,
  onEditSubmit,
}) => (
  <li className="flex flex-col space-y-2 py-4 border-b border-zinc-700 last:border-none">
    <div className="flex items-start justify-between space-x-3">
      <div className="flex items-start space-x-3 flex-1">
        <img
          src={comment.author.avatar || undefined}
          alt={comment.author.name}
          className="w-10 h-10 rounded-full object-cover bg-zinc-700"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-white">
            {comment.author.name}
          </p>
          {isEditing ? (
            <textarea
              value={editText}
              onChange={(e) => onEditChange(e.target.value)}
              className="mt-1 w-full bg-zinc-800 text-white rounded p-2 focus:outline-none"
            />
          ) : (
            <p className="mt-1 text-sm text-zinc-300">{comment.content}</p>
          )}
          <span className="block mt-1 text-xs text-zinc-500">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      {comment.author.id === myInfo.data.id && (
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={onEditSubmit}
                className="p-2 text-green-500 hover:text-green-400 transition-colors"
                aria-label="Submit edit"
              >
                <HiCheck className="h-5 w-5" />
              </button>
              <button
                onClick={onEditCancel}
                className="p-2 text-red-500 hover:text-red-400 transition-colors"
                aria-label="Cancel edit"
              >
                <HiX className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onEditClick(comment)}
                className="p-2 text-zinc-500 hover:text-white transition-colors"
                aria-label="Edit comment"
              >
                <HiPencil className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDeleteClick(comment.id)}
                className="p-2 text-zinc-500 hover:text-white transition-colors"
                aria-label="Delete comment"
              >
                <HiTrash className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  </li>
);

export default CommentItem;
