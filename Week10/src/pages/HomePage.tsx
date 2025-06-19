import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type { Movie, MovieFilters, MovieResponse } from "../types/movie";
import { MovieLanguages } from "../enums/languages";
import MovieModal from "../components/MovieModal";

const HomePage = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: MovieLanguages.KOREAN,
  });

  const axiosRequestconfig = useMemo(
    () => ({
      params: filters,
    }),
    [filters]
  );

  // 객체 값을 넘기면, 참조값이 매번 달라 무한 루프가 발생
  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestconfig
  );

  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters]
  );

  const handleSelectMovie = useCallback(
    (movie: Movie) => {
      setSelectedMovie(movie);
    },
    [setSelectedMovie]
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-center">
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <MovieList
          movies={data?.results || []}
          onSelectMovie={(movie) => handleSelectMovie(movie)}
        />
      )}
      <MovieModal
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
};

export default HomePage;
