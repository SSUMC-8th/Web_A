import clsx from "clsx";
import { ReactNode } from "react";

interface Tpagination {
  page: number;
  //setState 전용 타입
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({ page, setPage }: Tpagination): ReactNode {
  const prevPage = () => setPage((prev) => prev - 1);
  const nextPage = () => setPage((prev) => prev + 1);

  return (
    <div className="flex items-center justify-center gap-6">
      <button
        onClick={prevPage}
        disabled={page === 1}
        className={clsx(
          "w-8 h-8 flex items-center justify-center text-base font-semibold rounded-full transition-all",
          "bg-slate-500 hover:bg-slate-700 text-white shadow hover:shadow-lg",
          "disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
        )}
      >
        ←
      </button>

      <span className="text-xl font-semibold text-gray-800">{page}</span>

      <button
        onClick={nextPage}
        className={clsx(
          "w-8 h-8 flex items-center justify-center text-base font-semibold rounded-full transition-all",
          "bg-slate-500 hover:bg-slate-700 text-white shadow hover:shadow-lg"
        )}
      >
        →
      </button>
    </div>
  );
}

export default Pagination;
