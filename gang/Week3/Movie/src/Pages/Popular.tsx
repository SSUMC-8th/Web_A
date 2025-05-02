import { Movie, MovieBody } from "../types/movie";
import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import NotFound from "./NotFound";
import { useParams } from "react-router-dom";

const Popular = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState<number>(1);

  const { category } = useParams<{
    category: string;
  }>();

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      setIsError(false);
      
      try {
        const { data } = await axios.get<MovieBody>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [page, category]);

  useEffect(() => {
    setPage(1);
  }, [category]);


  if (isLoading) {
    return (
      <>
        <Pagination page={page} setPage={setPage} />
        <div className="flex justify-center items-center h-dvh">
          <LoadingSpinner />;
        </div>
      </>
    );
  }
  if (isError) {
    return <NotFound />;
  }
  return (
    <div>
      <Pagination page={page} setPage={setPage} />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
      </div>
    </div>
  );
};

export default Popular;
