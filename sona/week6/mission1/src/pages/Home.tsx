// import useGetLpList from "../hooks/useGetLpList";
import { useEffect, useState } from "react";
import useGetLpList from "../hooks/useGetLpList";
import { Lp, ResponseLpListDto } from "../types/lp";
import LpCard from "./LpCard";
import { PAGENATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/usegetInfiniteLpList";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [sortOrder, setSortOrder] = useState<PAGENATION_ORDER>(
    PAGENATION_ORDER.desc
  );

  const { data, isFetching, hasNextPage, fetchNextPage, isPending, isError } =
    useGetInfiniteLpList(10, "", PAGENATION_ORDER.desc);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div className="mt-[20px]">Error</div>;
  }
  if (isPending) {
    return <div className="mt-[20px]">Error</div>;
  }
  console.log(data);
  // const { data } = useGetLpList({
  //   order: sortOrder,
  // });
  return (
    <>
      <div className="flex ml-auto pt-5 text-sm">
        <button
          onClick={() => setSortOrder(PAGENATION_ORDER.asc)}
          className={
            sortOrder === PAGENATION_ORDER.asc ? "clickBtn" : "noneClickBtn"
          }
        >
          오래된순
        </button>
        <button
          onClick={() => setSortOrder(PAGENATION_ORDER.desc)}
          className={
            sortOrder === PAGENATION_ORDER.desc ? "clickBtn" : "noneClickBtn"
          }
        >
          최신순
        </button>
      </div>
      <div className=" px-15 py-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data?.pages.map((page: ResponseLpListDto) =>
          page.data.data.map((item) => <LpCard key={item.id} item={item} />)
        )}
      </div>
      {/* <div className="px-15 py-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data?.pages
          .map((page: ResponseLpListDto) => page.data.data)
          .flat()
          .map((item) => (
            <LpCard key={item.id} item={item} />
          ))}
      </div> */}
    </>
  );
}
