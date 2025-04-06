import axios from "axios";
import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { PulseLoader } from "react-spinners";
import PageNation from "../components/PageNation";
import { useParams } from "react-router-dom";

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const [movie, setMovie] = useState<Movie[]>([]);
  const [isError, setISError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { category } = useParams<{
    category: string;
  }>();

  useEffect((): void => {
    const fetchMovie = async (): Promise<void> => {
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              Accept: "application/json",
            },
          }
        );
        setMovie(data.results);
      } catch (e) {
        console.log(e);
        setISError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [category, page]);
  console.log(movie);
  if (isError) {
    return (
      <div>
        <span className="text-red">error가 발생했습니다</span>
      </div>
    );
  }

  return (
    <>
      <PageNation setPage={setPage} page={page} />
      {isLoading ? (
        <div className="flex items-center justify-center mt-60">
          <PulseLoader color={"#828282"} />
        </div>
      ) : (
        <div className=" p-15 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movie.map((item: Movie) => {
            return <MovieCard item={item} key={item.id} />;
          })}
        </div>
      )}
    </>
  );
}
