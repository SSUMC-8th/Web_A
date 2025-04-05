import { MovieDetail } from "../../types/movie";

const MovieDetailInfo = ({ movie }: { movie: MovieDetail }) => {
  return (
    <div className="relative mb-10">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-[40vh] sm:h-[50vh] object-cover rounded-2xl z-10"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-black/70 to-transparent rounded-2xl z-10" />
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 max-w-full sm:max-w-[600px] text-white z-30">
        <h1 className="text-xl sm:text-3xl font-bold mb-3">{movie.title}</h1>
        <div className="flex flex-col font-bold space-y-1 mb-3 text-sm sm:text-base">
          <span className="text-[#f39c12] text-lg sm:text-2xl">
            평균: {movie.vote_average}
          </span>
          <span>{movie.release_date?.slice(0, 4)}</span>
          <span>{movie.runtime}분</span>
        </div>
        {movie.tagline && (
          <h2 className="text-lg sm:text-2xl font-bold italic mb-3">
            {movie.tagline}
          </h2>
        )}
        <p className="text-sm sm:text-base leading-6">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetailInfo;
