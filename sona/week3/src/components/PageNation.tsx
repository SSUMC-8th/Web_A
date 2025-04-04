type PageProps = {
  setPage: (updater: (item: number) => number) => void;
  page: number;
};
export default function PageNation({ setPage, page }: PageProps) {
  // console.log(page);
  return (
    <div className="flex items-center justify-center gap-4 mt-5 text-white">
      <button
        className=" button-custom disabled:cursor-not-allowed"
        disabled={page === 1}
        onClick={(): void => setPage((item): number => item - 1)}
      >
        {"<"}
      </button>
      <span>{page}페이지</span>
      <button
        className="button-custom"
        onClick={(): void => setPage((item): number => item + 1)}
      >
        {">"}
      </button>
    </div>
  );
}
