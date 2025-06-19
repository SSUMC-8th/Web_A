import type { TMovie } from '@/types/Movie';

interface MovieCardProps {
  movie: TMovie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="overflow-hidden transition-shadow duration-200 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
      <div className="relative aspect-[2/3]">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="object-cover w-full h-full"
        />
        <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-md shadow-sm">
          {movie.vote_average.toFixed(1)}
        </span>
      </div>
      <div className="p-3">
        <h3
          className="mb-1 text-sm font-medium text-gray-800 truncate"
          title={movie.title}
        >
          {movie.title}
        </h3>
        <p className="text-xs text-gray-500">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
