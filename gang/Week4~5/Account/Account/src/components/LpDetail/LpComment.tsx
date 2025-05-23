import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { CommentDetail } from "../../types/comment";
import { useState } from "react";
import usePatchComment from "../../hooks/mutations/usePatchComment";
import useDeleteComment from "../../hooks/mutations/useDeleteComment";
import { DEFAULT_PROFILE_IMAGE } from "../../constants/key";

interface ILpComment {
  comment: CommentDetail;
  userId: number;
}

export default function LpComment({ comment, userId }: ILpComment) {
  const avatar = comment.author?.avatar ?? DEFAULT_PROFILE_IMAGE;
  const bio = comment.author?.bio ?? "";
  const name = comment.author?.name ?? "익명";
  const content = comment.content ?? "내용";

  const { mutate: patchComment } = usePatchComment();
  const { mutate: deleteComment } = useDeleteComment();

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      patchComment(
        {
          commentId: comment.id,
          lpId: comment.lpId,
          content: editContent,
        },
        {
          onSuccess: () => {
            setIsEditing(false);
            setIsMenuOpen(false);
          },
  
        }
      );
    } else {
      setIsEditing(true);
      setIsMenuOpen(false);
    }
  };

  const handleDelete = () => {
    deleteComment(
      {
        commentId: comment.id,
        lpId: comment.lpId,
      },
      {
        onSuccess: () => {
          setIsMenuOpen(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-row items-center gap-2 w-full">
      {/* Avatar */}
      <div className="w-12 h-12 flex-shrink-0">
        <img
          src={avatar}
          alt={bio}
          className="w-12 h-12 rounded-full bg-gray-400 object-cover"
        />
      </div>

      {/* Name and Content */}
      <div className="flex flex-col flex-grow">
        <h2 className="font-semibold">{name}</h2>
        {isEditing ? (
          <textarea
            className="w-full p-2 border rounded"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        ) : (
          <p className="text-white">{content}</p>
        )}
      </div>

      {/* 메뉴 버튼 */}
      {userId === comment.author.id && (
        <div className="relative flex items-center justify-end">
          <button
            type="button"
            onClick={handleMenuToggle}
            className="p-1 rounded hover:bg-gray-200"
          >
            <EllipsisVertical />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 bg-gray-600 text-gray-300 rounded shadow-lg p-2 z-10">
              <button
                type="button"
                className="flex items-center px-2 py-1 rounded hover:bg-gray-500 w-full text-left"
                onClick={handleEditToggle}
              >
                <Pencil className="w-4 h-4 mr-2" />
              </button>
              <button
                type="button"
                className="flex items-center px-2 py-1 rounded hover:bg-gray-500 w-full text-left"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
