import { useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type { MovieFilterT, MovieResponse } from "../types/movie";
import MovieModal from "../components/MovieModal";

export default function HomePage() {
  const [filter, setFilters] = useState<MovieFilterT>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const axiosRequestConfig = useMemo(
    (): { params: MovieFilterT } => ({ params: filter }),
    [filter]
  );

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig
  );
  return (
    <div className="max-w-7xl mx-auto p-6">
      {isLoading && <p className="text-center mt-10 text-gray-500">로딩 중</p>}
      {error && <p className="text-center mt-10 text-red-500">{error}</p>}

      <MovieFilter onChange={setFilters} />
      {/* 영화*/}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
        {data?.results.map((movie) => (
          <MovieList key={movie.id} item={movie} />
        ))}
      </div>
      <MovieModal />
    </div>
  );
}
