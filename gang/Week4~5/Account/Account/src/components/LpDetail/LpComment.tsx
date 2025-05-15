import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { CommentDetail } from "../../types/comment";
import { useState } from "react";
import { defaultProfileImage } from "../Registration/ProfileImage";

interface ILpComment {
  comment: CommentDetail;
  userId: number;
}

export default function LpComment({ comment, userId }: ILpComment) {
  const avatar = comment.author?.avatar ?? defaultProfileImage;
  const bio = comment.author?.bio ?? "";
  const name = comment.author?.name ?? "익명";
  const content = comment.content ?? "내용";
  console.log(comment.author.id, userId);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-row gap-2 ">
      <div className="flex justify-center items-center">
        <img
          className="w-12 h-12 rounded-full bg-gray-400"
          src={`${avatar}`}
          alt={`${bio}`}
        />
      </div>
      <div className="flex flex-col">
        <h2>{name}</h2>
        <p> {content}</p>
      </div>
      {userId === comment.author.id && (
        <div className="relative">
          <EllipsisVertical  className="bg-white" onClick={handleMenuToggle} />
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg p-2">
              <button className="flex items-center px-2 py-1 hover:bg-gray-100 w-full text-left">
                <Pencil className="w-4 h-4 mr-2" />
              </button>
              <button className="flex items-center px-2 py-1 hover:bg-gray-100 w-full text-left">
                <Trash2 className="w-4 h-4 mr-2" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
