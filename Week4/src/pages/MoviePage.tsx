import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../api/axios-instance";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import usePagination from "../hook/usePagination";
import PaginationBtn from "../components/Button/PagaginationBtn";
import { useParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // 1. 로딩
  const [isPending, setIsPending] = useState(false);
  // 2. 에러
  const [isError, setIsError] = useState(false);
  // 3. 페이지네이션
  const { page, setPage, handleNextPage, handlePrevPage } = usePagination();
  // 4. useParams
  const { category } = useParams<{ category: string }>();

  // 5. 리랜더링 방지 useCallback
  const onNext = useCallback(() => {
    handleNextPage(totalPages);
  }, [handleNextPage, totalPages]);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);
      try {
        const { data } = await axiosInstance.get<MovieResponse>(
          `/${category}?language=en-US&page=${page}`
        );

        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovies();
  }, [page, category]);

  // 카테고리 변경시 페이지 1로 초기화 !
  useEffect(() => {
    setPage(1);
  }, [category, setPage]);

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
        totalPages={totalPages}
      />
      {/** 삼항 연산자로 해도 동일 */}
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}
      {!isPending && (
        <div className="grid gap-4 p-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies &&
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
