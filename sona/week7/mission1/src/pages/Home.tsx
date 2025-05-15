// 생략된 import들은 그대로 유지
import { useEffect, useState } from "react";
import { ResponseLpListDto } from "../types/lp";
import LpCardSkeleton from "./LpCardSkeleton";
import LpModal from "./LpModal";
import SortComponent from "./SortComponent";
import useGetInfiniteLpList from "../hooks/usegetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCard from "./LpCard";
import { PAGENATION_ORDER } from "../enums/common";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<PAGENATION_ORDER>(
    PAGENATION_ORDER.desc
  );

  const { data, isFetching, hasNextPage, fetchNextPage } = useGetInfiniteLpList(
    5,
    "",
    sortOrder
  );

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const allLps =
    data?.pages.flatMap((page: ResponseLpListDto) => page.data.data) ?? [];

  return (
    <>
      <div className="flex flex-col min-h-screen w-full">
        <SortComponent sortOrder={sortOrder} setSortOrder={setSortOrder} />

        <div className="px-15 py-5 min-h-[400px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {allLps.map((item) => (
            <LpCard key={item.id} item={item} />
          ))}
          {isFetching &&
            Array.from({ length: 6 }).map((_, i) => <LpCardSkeleton key={i} />)}
        </div>

        <div ref={ref} className="h-10" />
      </div>

      {/* lp등록 */}
      <div
        className="fixed bottom-[76px] right-20 bg-amber-500 size-20 rounded-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src="/whitePlus.svg"
          alt="더하기"
          className="size-13 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* 등록 모달 */}
      {isModalOpen && (
        <LpModal
          onClose={() => setIsModalOpen(false)}
          onSubmitSuccess={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}
