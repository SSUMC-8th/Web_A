import axios from "axios";
import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect((): void => {
    const fetchMovies = async (): Promise<void> => {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            Accept: "application/json",
          },
        }
      );

      setMovies(data.results);
    };
    // console.log("TOKEN:", import.meta.env.VITE_TMDB_KEY);
    fetchMovies();
  }, []);

  console.log(movies);

  return (
    <div className=" p-15 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movies.map((item) => {
        return <MovieCard item={item} />;
      })}
    </div>
  );
}
