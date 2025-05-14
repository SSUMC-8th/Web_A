import { useState } from "react";
import { Comment } from "../types/comment";
interface CommentProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentProps) {
  // console.log(comment);

  const [isOpenCModeal, setOpenCModal] = useState(false);

  return (
    <>
      <div className=" relative flex bg-gray-700 gap-2 items-center mb-2 flex-grow ">
        <div>
          <img
            src={
              comment.author.avatar ? comment.author.avatar : "/profileimg.png"
            }
            alt="아바타"
            className="size-8 rounded-2xl"
          />
        </div>
        {/* 내용 */}
        <div className="flex-grow">
          <p>{comment.author.name}</p>
          <p>{comment.content}</p>
        </div>
        {/* 옵션버튼임 */}
        <div className="ml-auto">
          <button
            className=""
            onClick={() => {
              setOpenCModal((pre) => !pre);
            }}
          >
            <img src="/option.svg" alt="더보기" className="size-5" />
          </button>
        </div>

        {isOpenCModeal && (
          <div className=" absolute right-2  top-8 ml-auto  mt-1  flex gap-2 bg-black w-fit p-2 rounded-2xl z-10">
            <img src="/delete.svg" alt="" className="w-4 h-4" />
            <img src="/pencil.svg" alt="" className="w-4 h-4" />
          </div>
        )}
      </div>
    </>
  );
}
