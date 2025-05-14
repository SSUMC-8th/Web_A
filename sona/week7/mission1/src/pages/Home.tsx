import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useGetInfiniteLpList from "../hooks/usegetInfiniteLpList";
import { PAGENATION_ORDER } from "../enums/common";
import { ResponseLpListDto } from "../types/lp";
import LpCard from "./LpCard";
import LpCardSkeleton from "./LpCardSkeleton";
// import InputField from "../components/InputField";
// import { TagItem } from "./TagItem";
import LpModal from "./LpModal";

export default function Home() {
  const [sortOrder, setSortOrder] = useState<PAGENATION_ORDER>(
    PAGENATION_ORDER.desc
  );

  const [isModalOpen, setIsModalOpen] = useState(false); //modal

  const [tags, setTags] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState("");

  const { data, isFetching, isPending, isError, hasNextPage, fetchNextPage } =
    useGetInfiniteLpList(5, "", sortOrder);

  // console.log(data);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) return <div className="mt-[20px]">로딩 중...</div>;
  if (isError) return <div className="mt-[20px] text-red-500">에러 발생</div>;

  const allLps =
    data?.pages.flatMap((page: ResponseLpListDto) => page.data.data) ?? [];

  return (
    <>
      <div className="flex flex-col min-h-screen w-full">
        <div className="w-full flex justify-end px-4  py-2 text-sm">
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

        <div className="px-15 py-5 min-h-[400px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {allLps.map((item) => (
            <LpCard key={item.id} item={item} />
          ))}

          {/* 로딩 중일 때 스켈레톤 */}
          {isFetching &&
            Array.from({ length: 6 }).map((_, i) => (
              <LpCardSkeleton key={`${i}`} />
            ))}
        </div>

        {/* 무한스크롤 */}
        <div ref={ref} className="h-10" />
      </div>

      <div
        className=" bottom-[76px] fixed bg-amber-500 size-20 rounded-full right-20 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src="/whitePlus.svg"
          alt="더하기"
          className="size-13 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute"
        />
      </div>

      {isModalOpen && (
        <LpModal
          onClose={() => setIsModalOpen(false)}
          setTagInputValue={setTagInputValue}
          tagInputValue={tagInputValue}
          tags={tags}
          setTags={setTags}
        />
      )}
    </>
  );
}
