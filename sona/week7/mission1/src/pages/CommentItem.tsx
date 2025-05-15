import { useState } from "react";
import { Comment } from "../types/comment";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import { CommentPatchDto, LpDeleteDto } from "../types/common";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import useGetProfile from "../hooks/useGetProfile";
interface CommentProps {
  comment: Comment;
}

interface CommentForm {
  content: string;
}
export default function CommentItem({ comment }: CommentProps) {
  // console.log(comment);

  const { user } = useGetProfile();

  const [isOpenCModeal, setOpenCModal] = useState(false);
  console.log(comment);
  //삭제
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

  //수정
  const editBtn = useMutation({
    mutationFn: ({ commentId, lpId, content }: CommentPatchDto) => {
      return axiosInstance.patch(`v1/lps/${lpId}/comments/${commentId}`, {
        content,
      });
    },
    onSuccess: () => {
      alert("댓글이 수정되었습니다");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const [isEdit, setEdit] = useState(false);
  // {isEdit?}
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentForm>();

  const onEditSubmit = (data: { content: string }) => {
    editBtn.mutate({
      commentId: comment.id,
      lpId: comment.lpId,
      content: data.content,
    });
  };

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
          <p className="text-sm font-bold text-white">{comment.author.name}</p>

          {isEdit ? (
            <form
              onSubmit={handleSubmit(onEditSubmit)}
              className="flex gap-2 mt-1"
            >
              <div className="relative w-full">
                <InputField
                  placeholder="댓글을 수정하세요"
                  className="mb-0 "
                  errorMsg={errors.content?.message}
                  register={register("content", {
                    required: "댓글은 필수입력입니다",
                    minLength: {
                      value: 2,
                      message: "최소 2자 이상 입력해주세요",
                    },
                  })}
                />
              </div>
              <button
                type="submit"
                className="text-sm bg-blue-500 px-2 py-1 rounded shrink-0"
              >
                저장
              </button>
              <button
                type="button"
                onClick={() => setEdit(false)}
                className="text-sm bg-gray-500 px-2 py-1 rounded shrink-0"
              >
                취소
              </button>
            </form>
          ) : (
            <p className="text-sm text-gray-300 mt-1">{comment.content}</p>
          )}
        </div>

        {/* 옵션버튼임 */}
        {user?.id === comment?.authorId && (
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
        )}
        {/* 옵션메뉴 */}
        {isOpenCModeal && (
          <div className=" absolute right-2  top-8 ml-auto  mt-1  flex gap-2 bg-black w-fit p-2 rounded-2xl z-10">
            <button
              onClick={() =>
                deleteBtn.mutate({ commentId: comment.id, lpId: comment.lpId })
              }
            >
              <img src="/delete.svg" alt="삭제" className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setEdit(true); // 수정 모드로 전환
                setOpenCModal(false); // 메뉴 닫기
              }}
            >
              <img src="/pencil.svg" alt="수정" className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
