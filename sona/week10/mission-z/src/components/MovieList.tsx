import { useState } from "react";
import type { Movie } from "../types/movie";

interface MovieListProps {
  item: Movie;
}

export default function MovieList({ item }: MovieListProps) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage = "http://via.placeholder.com/640x480";

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
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
          <p className="text-sm  text-gray-600 mb-2">{item.release_date}</p>
          <p className="text-sm text-gray-800 line-clamp-2">{item.overview}</p>

          <div className="bg-blue-500 mt-2 w-fit px-2 text-white rounded-xl absolute top-0 right-0 mr-1">
            {item.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
      {modalOpen && (
        <>
          {/* <div className="fixed inset-0 bg-black/50 z-40" /> */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="w-full max-w-3xl rounded-2xl  relative">
              <img
                src={`${imageBaseUrl}${item.backdrop_path}`}
                alt=""
                className="w-full drop-shadow-[0_8px_8px_rgba(0,0,0,0.25)] h-64 object-cover"
              />
              <p className="absolute bottom-0 text-white font-bold text-2xl mb-2">
                {item.original_title}
              </p>
              {/* 바닥 */}
              <div className="px-6 py-4 bg-white flex gap-3">
                <img
                  src={`${imageBaseUrl}${item.backdrop_path}`}
                  alt=""
                  className="w-2xs"
                />
                {/* rmflem */}
                <div>
                  <p>{item.vote_average.toFixed(1)}</p>
                  <p>개봉일</p>
                  <p>{item.release_date}</p>
                  <p>인기도</p>
                  <p>줄거리</p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
