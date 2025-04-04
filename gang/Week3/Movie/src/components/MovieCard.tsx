import { useState } from "react";
import { Movie } from "../types/movie";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setisHovered] = useState(false);
  const navigate= useNavigate();
  return (
    <div
      onClick={()=> navigate(`/movie/${movie.id}`)}
      className=" relative rounded-xl shadow-lg  overflow-hidden  cursor-pointer w-50 transition-transform duration-500 hover:scale-105"
      onMouseEnter={(): void => setisHovered(true)}
      onMouseLeave={(): void => setisHovered(false)}
    >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title}`}
          className="rounded-xl w-full h-full object-cover "
        />
      {isHovered && (
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-100 transition-opacity duration-300 backdrop-blur-md">
          <h2 className="text-xl text-white font-bold p-4">{movie.title}</h2>
          <p className=" line-clamp-5 text-base text-gray-200 px-2">
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  );
}
