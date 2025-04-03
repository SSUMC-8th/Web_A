import { useState, useCallback } from "react";

const usePagination = (initialPage: number = 1) => {
  const [page, setPage] = useState(initialPage);

  const handlePrevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback((totalPage: number = 1) => {
    setPage((prev) => Math.min(prev + 1, totalPage || 1));
  }, []);

  return { page, setPage, handleNextPage, handlePrevPage };
};

export default usePagination;
