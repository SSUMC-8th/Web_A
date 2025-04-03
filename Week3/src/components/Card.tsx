import { ReactNode, useState } from "react";
import { TMovie } from "../types/movie";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

interface CardTypes {
  movie: TMovie;
}

function Card({ movie }: CardTypes): ReactNode {
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState<boolean>(false);

  const showPreview = (): void => setIsHover(true);
  const hidePreview = (): void => setIsHover(false);

  const navigateToDetail = (movie: TMovie): void => {
    navigate(`/movies/detail/${movie.id}`);
  };

  return (
    <div
      className="relative overflow-hidden transition-all duration-300 cursor-pointer rounded-2xl"
      onMouseEnter={showPreview}
      onMouseLeave={hidePreview}
      onClick={() => navigateToDetail(movie)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className={clsx(
          "object-cover transition duration-300",
          isHover && "blur-sm scale-105"
        )}
      />

      {isHover && (
        <div className="absolute inset-0 flex flex-col justify-center px-4 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-60">
          <h5 className="mb-4 text-xl text-white">{movie.title}</h5>
          <p className="overflow-hidden text-sm text-white">{movie.overview}</p>
        </div>
      )}
    </div>
  );
}

export default Card;
