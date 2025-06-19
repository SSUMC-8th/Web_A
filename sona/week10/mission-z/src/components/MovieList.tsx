import type { Movie } from "../types/movie";
import { useModalStore } from "../hooks/useModalStore";
import { memo } from "react";

interface MovieListProps {
  item: Movie;
}

function MovieList({ item }: MovieListProps) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage = "https://via.placeholder.com/640x480";

  const openModal = useModalStore((state) => state.modalOpen);

  return (
    <>
      <div
        className="bg-white shadow rounded overflow-hidden hover:shadow-xl transition-all relative cursor-pointer"
        onClick={() => openModal(item)}
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
    </>
  );
}
export default memo(MovieList, (prev, next) => {
  return JSON.stringify(prev.item) === JSON.stringify(next.item);
});
