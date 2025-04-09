import { useState, ReactNode } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import Card from "../components/Card";
import Pagination from "../components/Pagination";

import { TMovieResponse } from "../types/movieTypes";
import useFetch from "../hooks/useFetch";

type CategoryType = "popular" | "upcoming" | "top-rated" | "now_playing";
type paramsType = {
  category: CategoryType;
};

function Movies(): ReactNode {
  const { category } = useParams<paramsType>();

  const [page, setPage] = useState<number>(1);

  const urlMap: Record<CategoryType, string> = {
    popular: import.meta.env.VITE_TMDB_URL_POPULAR,
    upcoming: import.meta.env.VITE_TMDB_URL_UPCOMING,
    "top-rated": import.meta.env.VITE_TMDB_URL_TOPRATED,
    now_playing: import.meta.env.VITE_TMDB_URL_NOWPLAYING,
  };

  const url = category ? urlMap[category] : undefined;

  const { data, isPending, isError } = useFetch<TMovieResponse>(url, page);

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
        {data?.results.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}

export default Movies;
