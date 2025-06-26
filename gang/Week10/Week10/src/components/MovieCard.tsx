
import { memo } from "react";
import type { Movie } from "../types/movies";

interface IMovieCard {
  movie: Movie;
  onClick?: () => void;
}

export default memo(function MovieCard({ movie, onClick }: IMovieCard) {
  return (
    <div className="flex flex-col m-3 rounded-xl shadow-lg  overflow-hidden  cursor-pointer w-50" onClick={onClick}>
      <div className="relative">
        <div className="absolute  top-1 right-1  bg-blue-500 text-white text-sm m-1 p-1 rounded-md shadow-md z-10">
          {movie.vote_average.toFixed(1)}
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title}`}
          className="rounded-xl w-full h-auto object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center opacity-100 ">
        <h2 className="text-xl text-black font-bold p-4">{movie.title}</h2>
        <p className=" line-clamp-5 text-base text-black px-2">
          {movie.overview}
        </p>
      </div>
    </div>
  );
})
