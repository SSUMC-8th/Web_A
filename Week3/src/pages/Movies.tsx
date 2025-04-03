import { useState, useEffect, ReactNode } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import Card from "../components/Card";
import Pagination from "../components/pagination";

import { TMovie, TMovieResponse } from "../types/movie";

type CategoryType = "popular" | "upcoming" | "top-rated" | "now_playing";
type paramsType = {
  category: CategoryType;
};

function Movies(): ReactNode {
  const { category } = useParams<paramsType>();

  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  const urlMap: Record<CategoryType, string> = {
    popular: import.meta.env.VITE_TMDB_URL_POPULAR,
    upcoming: import.meta.env.VITE_TMDB_URL_UPCOMING,
    "top-rated": import.meta.env.VITE_TMDB_URL_TOPRATED,
    now_playing: import.meta.env.VITE_TMDB_URL_NOWPLAYING,
  };

  //로딩 및 에러처리
  useEffect(() => {
    if (!category) return;

    const fetchMovies = async (): Promise<void> => {
      setIsPending(true);
      setIsError(false);

      try {
        const { data } = await axios.get<TMovieResponse>(
          `${urlMap[category]}&page=${page}`,
          {
            headers: {
              Authorization: `${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  //카테고리 변경 시 페이지 초기화
  useEffect(() => {
    setPage(1);
  }, [category]);

  //로딩/에러 처리
  if (isPending || isError) {
    return (
      <div className="flex items-center justify-center h-dvh">
        {isPending && <LoadingSpinner />}
        {isError && <ErrorMessage />}
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center py-4">
      <Pagination page={page} setPage={setPage} />

      <div className="grid grid-cols-6 gap-4 p-4">
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}

export default Movies;
