import { useEffect, useState } from "react";
import LpCard from "../components/Cards/LpCard";
import { PAGINATION_ORDER } from "../enums/pagination";
import useGetInfiniteLpList from "../hook/queries/Lp/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../components/LoadingSpinner";
import LpCardListSkeleton from "../components/Cards/LpCardListSkeleton";

const HomePage = () => {
  const [search] = useState("");
  const [sortOrder, setSortOrder] = useState<
    PAGINATION_ORDER.asc | PAGINATION_ORDER.desc
  >(PAGINATION_ORDER.asc);

  const {
    data: infiniteData,
    isFetching,
    isPending,
    hasNextPage,
    isError,
    fetchNextPage,
  } = useGetInfiniteLpList(20, search, sortOrder);

  // ref, InView
  // ref => 특정한 HTML 요소를 감시할 수 있다.
  // inView => 그 요소가 화면에 보이면 true, 아니면 false
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div>에러</div>;
  }
  return (
    <>
      {/* 정렬 버튼 */}
      <div className="mb-4 flex gap-2 justify-end">
        <button
          className={`px-4 py-2 border rounded-3xl ${
            sortOrder === PAGINATION_ORDER.asc
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
          onClick={() => setSortOrder(PAGINATION_ORDER.asc)}
        >
          최신순
        </button>
        <button
          className={`px-4 py-2 border rounded-3xl ${
            sortOrder === PAGINATION_ORDER.desc
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
          onClick={() => setSortOrder(PAGINATION_ORDER.desc)}
        >
          오래된순
        </button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {isPending && <LpCardListSkeleton count={20} />}
        {infiniteData?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((item) => (
            <LpCard
              key={item.id}
              id={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
              updatedAt={item.updatedAt}
              likes={item.likes}
            />
          ))}

        {isFetching && <LpCardListSkeleton count={20} />}
      </div>
      <div ref={ref}>
        {isFetching && (
          <div className="flex justify-center items-center mt-4">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
