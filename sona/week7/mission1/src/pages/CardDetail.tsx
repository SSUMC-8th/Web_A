import { Link, useParams } from "react-router-dom";
import getTimePassed from "../utils/dateCalculate";
import Comment from "./Comment";

import useGetProfile from "../hooks/useGetProfile";
import useGetLpDetail from "../hooks/useGetLpDetail";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";

export default function CardDetail() {
  const { id } = useParams();
  const lpId = Number(id);
  const { data } = useGetLpDetail(lpId);
  console.log(data);

  const { user } = useGetProfile();

  console.log(data);

  const deletePost = useMutation({
    mutationFn: (lpId) => {
      return axiosInstance.delete(`v1/lps/${lpId}`);
    },
    onSuccess: () => {
      alert("게시글이 삭제되었습니다");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <main className="max-w-3xl bg-gray-700 p-7 mx-auto">
        {/* 상세 */}
        <section>
          <div className="relative">
            <div className=" flex items-center justify-between border-b-amber-50 border-b-2">
              <div className="font-bold text-2xl">{data?.author?.name}</div>
              <p>
                {data?.createdAt
                  ? getTimePassed(new Date(data.createdAt))
                  : "1일 전"}
              </p>
            </div>

            <div>{data?.title}</div>
            {/* 삭제 수정 */}
            {user?.id === data?.author?.id && (
              <div
                className=" absolute right-0  top-8 ml-auto  mt-1  flex gap-3 w-fit pt-2 rounded-2xl z-10"
                onClick={() => deletePost.mutate(lpId)}
              >
                <button className="cursor-pointer">
                  <img src="/delete.svg" alt="삭제" className="w-4 h-4" />
                </button>
                <Link to={`/lp/${id}/edit`}>
                  <button className="cursor-pointer">
                    <img src="/pencil.svg" alt="수정" className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            )}

            <div className=" flex items-center justify-center">
              <div className="drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)] bg-gray-600 my-6 p-7 relative">
                <img
                  className=" animate-[spin_8s_linear_infinite] size-64 object-cover  rounded-full border-4 border-black "
                  src={data?.thumbnail}
                  alt=""
                />
                <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 border border-gray-400" />
              </div>
            </div>
            <p>{data?.content}</p>
          </div>
          <ul className="mx-7 my-5 flex gap-3 flex-wrap justify-center items-center">
            {data?.tags?.map((tag) => {
              return (
                <li key={tag.id} className="bg-gray-400 w-fit px-2 rounded-2xl">
                  #{tag.name}
                </li>
              );
            })}
          </ul>
        </section>
        <div className="flex justify-center gap-3 items-center">
          <img className="size-7" src="/detailHart.svg" alt="" />
          <p className="text-xl ">{data?.likes?.length}</p>
        </div>
        <Comment />
      </main>
    </>
  );
}
