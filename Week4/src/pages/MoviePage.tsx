import { useCallback, useEffect } from "react";
import { MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import usePagination from "../hook/usePagination";
import PaginationBtn from "../components/Button/PagaginationBtn";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hook/useCustomFetch";
import { API } from "../constants/api";

const MoviesPage = () => {
  // 1. 페이지네이션
  const { page, setPage, handleNextPage, handlePrevPage } = usePagination();
  // 2. useParams
  const { category } = useParams<{ category: string }>();
  // 3. URL
  const MovieURL = API.MOVIES(category!, page);

  const {
    data: movieData,
    isPending,
    isError,
  } = useCustomFetch<MovieResponse>(MovieURL);

  // 4. 카테고리 변경시 페이지 1로 초기화 !
  useEffect(() => {
    setPage(1);
  }, [category, setPage]);

  // 5. 리랜더링 방지 useCallback
  const onNext = useCallback(() => {
    if (movieData) {
      handleNextPage(movieData.total_pages);
    }
  }, [handleNextPage, movieData]);

  if (isError)
    return (
      <div className="text-center text-red-500">에러가 발생했습니다 😢</div>
    );

  return (
    <div className="bg-black">
      <PaginationBtn
        page={page}
        onNext={onNext}
        onPrev={handlePrevPage}
        totalPages={movieData?.total_pages || 1}
      />
      {/** 삼항 연산자로 해도 동일 */}
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}
      {!isPending && movieData && (
        <div className="grid gap-4 p-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movieData?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
