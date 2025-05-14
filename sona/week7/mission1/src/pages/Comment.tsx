import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import { useParams } from "react-router-dom";
import CommentItem from "./CommentItem";
import useGetInfiniteCommentList from "../hooks/usegetInfiniteCommentList";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import CommentSkeleton from "./CommentSkeleton";
import { PAGENATION_ORDER } from "../enums/common";
import SortComponent from "./SortComponent";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";

type FormFields = {
  content: string;
};

export default function Comment() {
  const [sortOrder, setSortOrder] = useState<PAGENATION_ORDER>(
    PAGENATION_ORDER.desc
  );
  const { id } = useParams();
  const lpId = Number(id);
  // const { data: comment, isLoading, isError } = useGetCommentList({ lpId });
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetching } =
    useGetInfiniteCommentList(lpId, "", 10, sortOrder); // limit 10개씩

  // console.log(data);
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<FormFields>({
    defaultValues: {
      content: "",
    },
  });

  const addComment = useMutation({
    mutationFn: (comment) =>
      axiosInstance.post(`/v1/lps/${lpId}/comments`, comment),
    onSuccess: () => {
      alert("댓글작성 성공");
      reset();
    },
    onError: () => {
      alert("댓글작성 실패");
    },
  });

  const { ref, inView } = useInView({ threshold: 0 });

  // console.log(data);
  useEffect(() => {
    // console.log("inView:", inView, "hasNext:", hasNextPage);
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러가 발생했습니다.</p>;

  const allComments = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <section>
      <div className="flex items-center">
        <p className="mb-3 shrink-0">댓글</p>
        <SortComponent sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>
      {/* 입력창 */}
      <div className="flex items-center gap-2 mb-4">
        <InputField
          type="text"
          placeholder="댓글을 입력하세요"
          className="mb-0"
          errorMsg={errors.content?.message}
          register={{
            ...register("content", {
              required: "댓글은 필수입력입니다",
              minLength: {
                value: 2,
                message: "댓글은 최소 2글자 이상이어야 합니다.",
              },
            }),
          }}
        />
        <button
          className="bg-gray-400 rounded-xl px-3 shrink-0 py-2"
          onClick={handleSubmit(addComment.mutate)}
        >
          작성
        </button>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {allComments.map((item) => (
          <CommentItem key={item.id} comment={item} />
        ))}

        {/* 무한스크롤 감지 div */}
        <div ref={ref} className="h-10" />

        {isFetching &&
          Array.from({ length: 4 }).map((_, i) => (
            <CommentSkeleton key={`${i}`} />
          ))}
      </div>
    </section>
  );
}
