import type { Movie } from "../types/movie";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Fragment, memo } from "react";
import { MovieLanguages } from "../enums/languages";
import { DATE_FORMAT_KR } from "../utils/dateFormat";

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieModal = ({ movie, isOpen, onClose }: MovieModalProps) => {
  if (!movie) return null;

  const releaseDate = new Date(movie.release_date).toLocaleDateString(
    MovieLanguages.KOREAN,
    DATE_FORMAT_KR
  );

  return (
    <Dialog open={isOpen} onClose={onClose} as={Fragment}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <DialogPanel className="relative w-full max-w-3xl rounded-lg bg-white  shadow-xl">
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white hover:bg-gray-800"
          >
            ✕
          </button>

          {/* 상단 배경 이미지 */}
          <div className="relative h-64 w-full overflow-hidden rounded-md">
            <img
              src={
                movie.backdrop_path
                  ? `${import.meta.env.VITE_IMAGE_BASE_URL}${
                      movie.backdrop_path
                    }`
                  : `${import.meta.env.VITE_IMAGE_BASE_URL}${movie.poster_path}`
              }
              alt="backdrop"
              className="h-full w-full object-cover brightness-75"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-2xl font-bold">{movie.title}</h2>
              {movie.original_title !== movie.title && (
                <p className="text-sm">{movie.original_title}</p>
              )}
            </div>
          </div>

          {/* 본문 영역 */}
          <div className="mt-4 grid grid-cols-[150px_1fr] gap-4 p-6">
            {/* 포스터 */}
            <img
              src={
                movie.poster_path
                  ? `${import.meta.env.VITE_IMAGE_BASE_URL}${movie.poster_path}`
                  : "https://via.placeholder.com/640x480"
              }
              alt="poster"
              className="w-full max-w-[150px] h-[250px] object-cover rounded-md"
            />

            {/* 정보 */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-blue-600">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500">
                  ({movie.vote_count} 평가)
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-800">
                <p className="mb-1">
                  <strong>개봉일</strong>: {releaseDate}
                </p>
                <p className="mb-1">
                  <strong>인기도</strong>: {movie.popularity.toFixed(0)}
                </p>
              </div>

              <div className="mt-3 text-sm text-gray-700">
                <strong>줄거리</strong>
                <p className="mt-1 whitespace-pre-wrap leading-relaxed">
                  {movie.overview || "줄거리 정보가 없습니다."}
                </p>
              </div>

              {/* IMDb 버튼 */}
              <div className="mt-4 flex gap-2">
                <a
                  href={`https://www.imdb.com/find?q=${encodeURIComponent(
                    movie.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  IMDb에서 검색
                </a>
                <button
                  onClick={onClose}
                  className="inline-block rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default memo(MovieModal);
