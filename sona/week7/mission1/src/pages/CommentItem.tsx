import { useState } from "react";
import { Comment } from "../types/comment";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import { LpDeleteDto } from "../types/common";
interface CommentProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentProps) {
  // console.log(comment);

  const [isOpenCModeal, setOpenCModal] = useState(false);

  const deleteBtn = useMutation({
    mutationFn: ({ commentId, lpId }: LpDeleteDto) => {
      return axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
    },
    onSuccess: () => {
      alert("댓글이 삭제되었습니다");
    },
    onError: (err) => {
      console.log(err);
    },
  });

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
              // console.log(comment.id);
            }}
          >
            <img src="/option.svg" alt="더보기" className="size-5" />
          </button>
        </div>

        {isOpenCModeal && (
          <div className=" absolute right-2  top-8 ml-auto  mt-1  flex gap-2 bg-black w-fit p-2 rounded-2xl z-10">
            <button
              onClick={() =>
                deleteBtn.mutate({ commentId: comment.id, lpId: comment.lpId })
              }
            >
              <img src="/delete.svg" alt="" className="w-4 h-4" />
            </button>
            <button>
              <img src="/pencil.svg" alt="" className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
