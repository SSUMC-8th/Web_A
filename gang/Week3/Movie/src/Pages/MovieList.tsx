import { Movies, MoviesBody } from "../types/movie";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import NotFound from "./NotFound";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

const Popular = () => {
  const [movies, setMovies] = useState<Movies[]>([]);

  const [page, setPage] = useState<number>(1);
  const [total_pages, setTotal_Pages] = useState<number>(1);

  const { category } = useParams<{
    category: string;
  }>();

  const moviesUrl = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`;
  const { data, isLoading, isError } = useCustomFetch<MoviesBody>(moviesUrl);
  useEffect(() => {
    if (data) {
      setMovies(data.results);
      setTotal_Pages(data.total_pages);
    }
  }, [data]);
  useEffect(() => {
    setPage(1);
  }, [category]);

  if (isError) {
    return <NotFound />;
  }

  if (isLoading) {
    return (
      <>
        <Pagination page={page} setPage={setPage} total_pages={total_pages} />
        <div className="flex justify-center items-center h-dvh">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  return (
    <div>
      <Pagination page={page} setPage={setPage} total_pages={total_pages} />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
      </div>
    </div>
  );
};

export default Popular;
