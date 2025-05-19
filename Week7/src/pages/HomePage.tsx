import { useEffect, useState } from "react";
import LpCard from "../components/Cards/LpCard";
import { PAGINATION_ORDER } from "../enums/pagination";
import useGetInfiniteLpList from "../hook/queries/Lp/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../components/LoadingSpinner";
import LpCardListSkeleton from "../components/Cards/LpCardListSkeleton";
import LpForm from "../components/Forms/LpForm";
import LpModal from "../components/Modal/LpModal";
import { useCreateLp } from "../hook/mutations/useCreateLp";
import { uploadAvatar } from "../api/Post/upload";
import toast from "react-hot-toast";
import { LpFormValues } from "../types/lp";

const HomePage = () => {
  const [search] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState<
    PAGINATION_ORDER.asc | PAGINATION_ORDER.desc
  >(PAGINATION_ORDER.desc);

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

  const { mutateAsync: createAsync } = useCreateLp();

  const handleCreate = async (data: LpFormValues) => {
    const { title, content, tags, imageFile } = data;
    // 이미지 업로드
    const thumbnail = imageFile ? await uploadAvatar(imageFile) : "";
    try {
      // LP 생성
      const res = await createAsync({
        title,
        content,
        tags,
        thumbnail,
        published: true,
      });

      // 모달 닫기
      setShowModal(false);
      toast.success(`LP #${res.data.id} 생성 완료!`);
    } catch (err) {
      toast.error("생성 실패: " + (err as Error).message);
    }
  };

  if (isError) {
    return <div>에러</div>;
  }
  return (
    <>
      {/* 정렬 버튼 */}
      <div className="mb-4 flex gap-2 justify-end">
        <button
          className={`px-4 py-2 border rounded-3xl ${
            sortOrder === PAGINATION_ORDER.desc
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
          onClick={() => setSortOrder(PAGINATION_ORDER.desc)}
        >
          최신순
        </button>
        <button
          className={`px-4 py-2 border rounded-3xl ${
            sortOrder === PAGINATION_ORDER.asc
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
          onClick={() => setSortOrder(PAGINATION_ORDER.asc)}
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
      <button
        className="fixed bottom-15 right-15 z-50 w-14 h-14 bg-pink-500 hover:bg-pink-600 text-white text-3xl rounded-full shadow-lg flex items-center justify-center"
        onClick={() => setShowModal(true)}
      >
        +
      </button>

      <LpModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <LpForm onSubmit={handleCreate} />
      </LpModal>
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
