import { useEffect } from 'react';

import { createPortal } from 'react-dom';

import type { TMovie } from '@/types/Movie';

interface MovieModalProps {
  movie: TMovie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden bg-white shadow-lg rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute z-10 flex items-center justify-center w-8 h-8 text-white rounded-full top-4 right-4 bg-black/50 hover:bg-black/80"
        >
          &times;
        </button>

        {/* 배경 이미지 */}
        <div className="relative h-48 bg-black">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="배경"
            className="object-cover w-full h-full opacity-40"
          />
          <div className="absolute inset-0 flex items-center px-6 text-white">
            <div>
              <h2 className="text-2xl font-bold">{movie.title}</h2>
              <p className="text-sm text-gray-200">{movie.original_title}</p>
            </div>
          </div>
        </div>

        {/* 콘텐츠 */}
        <section className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6 p-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg"
          />

          <div className="flex flex-col justify-between space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-blue-600">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500">
                ({movie.vote_count.toLocaleString()}명 평가)
              </span>
            </div>

            <div className="text-sm text-gray-700">
              <div className="mb-1">
                <span className="font-medium text-gray-800">개봉일: </span>
                {movie.release_date}
              </div>
              <div>
                <span className="font-medium text-gray-800">인기도: </span>
                {movie.popularity.toLocaleString()}
              </div>
            </div>

            <div className="pr-2 overflow-y-auto text-sm leading-relaxed text-gray-700 max-h-40">
              {movie.overview || '줄거리 정보가 없습니다.'}
            </div>

            <div className="flex gap-2 mt-4">
              <a
                href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`}
                //새 페이지에서 열림
                target="_blank"
                //스크립트 차단, 헤더 전송 차단
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                IMDb에서 검색
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
              >
                닫기
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>,
    document.body,
  );
};

export default MovieModal;
