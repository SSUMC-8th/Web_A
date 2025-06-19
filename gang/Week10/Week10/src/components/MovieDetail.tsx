import { memo } from "react";
import type { Movie } from "../types/movies";

interface IMovieCard {
  movie: Movie;
  onClose: () => void;
}
export default memo(function MovieDetail({ movie, onClose }: IMovieCard) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative">
        <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden rounded-t-lg">
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-4 text-white text-lg font-semibold bg-black bg-opacity-50 px-3 py-1 rounded">
            {movie.title}
          </div>

          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-80"
          >
            ✕
          </button>
        </div>

        <div className="p-4 flex gap-4">
          <div className="w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg w-full object-cover"
            />
          </div>

          <div className="w-2/3 flex flex-col justify-between">
            <div>
              <p className="text-blue-600 font-bold text-xl">
                {movie.vote_average.toFixed(1)}{" "}
                <span className="text-sm text-gray-600">
                  ({movie.vote_count} 평가)
                </span>
              </p>

              <p className="mt-2 text-sm text-gray-700">
                📅 개봉일: {movie.release_date}
              </p>

              <div className="mt-2">
                🔥 인기도
                <div className="w-full bg-gray-200 rounded-full h-3 mt-1 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full"
                    style={{
                      width: `${Math.min(movie.popularity / 10, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-semibold">줄거리</p>
                <p className="text-sm text-gray-800">
                  {movie.overview.length > 200
                    ? `${movie.overview.slice(0, 200)}...`
                    : movie.overview}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <a
                href={`https://www.themoviedb.org/movie/${movie.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
              >
                TMDB에서 보기
              </a>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
)