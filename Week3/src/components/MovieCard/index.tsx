import { useState } from "react";
import { MovieCardProps } from "../../types/movie";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isHoverd, setIsHoverd] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movies/detail/${movie.id}`)}
      className="relative w-50 shadow-lg cursor-pointer overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHoverd(true)}
      onMouseLeave={() => setIsHoverd(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`${movie.title} 영화의 이미지`}
      />
      {isHoverd && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md flex flex-col justify-center text-white p-4 overflow-hidden">
          <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
          <p className="text-sm line-clamp-5 text-gray-300 leading-relaxed">
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
