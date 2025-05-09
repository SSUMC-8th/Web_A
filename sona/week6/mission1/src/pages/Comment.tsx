import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import { useParams } from "react-router-dom";
import useGetCommentList from "../hooks/useGetCommentList";
import CommentItem from "./CommentItem";

type FormFields = {
  comment: string;
};

export default function Comment() {
  const { id } = useParams();
  const lpId = Number(id);
  const { data: comment, isLoading, isError } = useGetCommentList({ lpId });

  console.log(comment);
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: {
      comment: "",
    },
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러가 발생했습니다.</p>;

  return (
    <section>
      <p className="mb-3">댓글</p>
      <div className="flex items-center gap-2 mb-4">
        <InputField
          type="text"
          placeholder="댓글을 입력하세요"
          className="mb-0"
          errorMsg={errors.comment?.message}
          register={{
            ...register("comment", {
              required: "댓글은 필수입력입니다",
              minLength: {
                value: 2,
                message: "댓글은 최소2글자 이상이어야 합니다.",
              },
            }),
          }}
        />
        <button
          className="bg-gray-400 rounded-xl px-2 shrink-0 py-2"
          // onClick={handleSubmit(onSubmit)}
        >
          작성
        </button>
      </div>

      <div>
        {comment?.data.map((item) => (
          <CommentItem key={item.id} comment={item} />
        ))}
      </div>
    </section>
  );
}
