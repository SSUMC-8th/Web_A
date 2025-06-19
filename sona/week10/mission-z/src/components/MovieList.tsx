import { useState } from "react";
import type { Movie } from "../types/movie";

interface MovieListProps {
  item: Movie;
}

export default function MovieList({ item }: MovieListProps) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage = "https://via.placeholder.com/640x480"; // http → https

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* 카드 */}
      <div
        className="bg-white shadow rounded overflow-hidden hover:shadow-xl transition-all relative cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <img
          src={
            item.poster_path
              ? `${imageBaseUrl}${item.poster_path}`
              : fallbackImage
          }
          alt={item.title}
          className="w-full h-72 object-cover"
        />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{item.release_date}</p>
          <p className="text-sm text-gray-800 line-clamp-2">{item.overview}</p>
          <div className="bg-blue-500 mt-2 w-fit px-2 text-white rounded-xl absolute top-0 right-0 mr-1">
            {item.vote_average.toFixed(1)}
          </div>
        </div>
      </div>

      {/* 모달 */}
      {modalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setModalOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg relative">
              {/* 상단 백드롭 이미지 */}
              <div className="relative h-64">
                <img
                  src={
                    item.backdrop_path
                      ? `${imageBaseUrl}${item.backdrop_path}`
                      : fallbackImage
                  }
                  alt="backdrop"
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-4 right-4 text-white text-2xl font-bold cursor-pointer"
                  onClick={() => setModalOpen(false)}
                >
                  ×
                </button>
                <div className="absolute bottom-4 left-6 text-white">
                  <h2 className="text-2xl font-bold">{item.title}</h2>
                  <p className="text-sm opacity-80">
                    {item.original_title} (
                    {item.original_language.toUpperCase()})
                  </p>
                </div>
              </div>

              {/* 상세 정보 */}
              <div className="p-6 flex gap-6">
                <img
                  src={
                    item.poster_path
                      ? `${imageBaseUrl}${item.poster_path}`
                      : fallbackImage
                  }
                  alt="poster"
                  className="w-40 h-auto rounded shadow object-cover"
                />
                <div className="text-left space-y-2">
                  <p className="text-blue-600 font-bold text-xl">
                    {item.vote_average.toFixed(1)}{" "}
                    <span className="text-sm text-gray-500">
                      ({item.vote_count} 평가)
                    </span>
                  </p>
                  <div>
                    <p className="font-bold">개봉일</p>
                    <p>{item.release_date}</p>
                  </div>
                  <div>
                    <p className="font-bold">인기도</p>
                    <p>{item.popularity.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="font-bold">줄거리</p>
                    <p className="text-sm text-gray-700">{item.overview}</p>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <a
                      href={`https://www.imdb.com/find?q=${encodeURIComponent(
                        item.title
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      IMDb에서 검색
                    </a>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
