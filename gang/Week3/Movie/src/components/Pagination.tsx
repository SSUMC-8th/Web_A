
interface IPagination {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ page, setPage }: IPagination) => {
  return (
    <div className="flex items-center justify-center gap-6 mt-5">
      <button
        className="shadow-md cursor-pointer bg-[#f59871] text-white px-6 py-3 m-3 rounded-lg hover:bg-[#c4896b] disabled:bg-gray-300 transition-all duration-200 disabled;bg-gray-300 disabled:cursor-not-allowed"
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 1}
      >
        {"<"}
      </button>
      <p>{page}</p>
      <button
        className="shadow-md cursor-pointer bg-[#f59871] text-white px-6 py-3 m-3 rounded-lg hover:bg-[#c4896b] disabled:bg-gray-300 transition-all duration-200 disabled;bg-gray-300 "
        onClick={() => setPage((prev) => prev + 1)}
      >
        {" "}
        {">"}{" "}
      </button>
    </div>
  );
};

export default Pagination;
