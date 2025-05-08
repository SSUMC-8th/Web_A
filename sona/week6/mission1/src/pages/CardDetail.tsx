import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import { useParams } from "react-router-dom";
import useGetProfile from "../hooks/useGetProfile";
import getTimePassed from "../utils/dateCalculate";

export default function CardDetail() {
  const { id } = useParams();
  //   console.log(id);
  const { user } = useGetProfile();

  const { data } = useQuery({
    queryKey: ["LpDetail"],
    queryFn: () => axiosInstance.get(`v1/lps/${id}`),
    select: (res) => res.data.data,
  });

  //   console.log(data);
  return (
    <>
      <main className="max-w-3xl bg-gray-700 p-7 mx-auto">
        <div>
          <div className=" flex items-center justify-between border-b-amber-50 border-b-2">
            <div className="font-bold text-2xl">{user?.name}</div>
            <p>
              {data?.createdAt
                ? getTimePassed(new Date(data.createdAt))
                : "1일 전"}
            </p>
          </div>

          <div>{data?.author?.name}</div>
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
          <li className="bg-gray-400 w-fit px-2 rounded-2xl">#sdas</li>
          <li className="bg-gray-400 w-fit px-2 rounded-2xl">#sdas</li>
          <li className="bg-gray-400 w-fit px-2 rounded-2xl">#sdas</li>
          <li className="bg-gray-400 w-fit px-2 rounded-2xl">#sdas</li>
          <li className="bg-gray-400 w-fit px-2 rounded-2xl">#sdas</li>
          <li className="bg-gray-400 w-fit px-2 rounded-2xl">#sdas</li>
          <li className="bg-gray-400 w-fit px-2 rounded-2xl">#sdas</li>
          <li className="bg-gray-400 w-fit px-2 rounded-2xl">#sdas</li>
          {/* {data.tags?.map((tag) => {
            return <li key={tag.id}>#{tag.name}</li>;
          })} */}
        </ul>
        <div className="flex justify-center gap-3 items-center">
          <img className="size-7" src="/detailHart.svg" alt="" />
          <p className="text-xl ">{data?.likes.length}</p>
        </div>
      </main>
    </>
  );
}
