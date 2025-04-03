import { PaginationBtnProps } from "../../../types/movie";

const PaginationBtn = ({
  page,
  totalPages,
  onNext,
  onPrev,
}: PaginationBtnProps) => {
  return (
    <div className="flex justify-center gap-4 items-center">
      <button
        onClick={onPrev}
        className="bg-[#dda5e3] px-4 py-2 rounded hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
        disabled={page <= 1}
      >
        이전
      </button>
      <span className="font-bold text-lg text-white">
        {page} / {totalPages} 페이지
      </span>
      <button
        onClick={onNext}
        className="bg-[#dda5e3] px-4 py-2 rounded hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
        disabled={page >= totalPages} // ✅ 마지막 페이지일 때 비활성화
      >
        다음
      </button>
    </div>
  );
};

export default PaginationBtn;
