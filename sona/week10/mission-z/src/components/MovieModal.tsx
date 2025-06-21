import { useModalStore } from "../hooks/useModalStore";

export default function MovieModal() {
  const { selectedMovie, modalClose, isOpen } = useModalStore();
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage = "https://via.placeholder.com/640x480";

  if (!isOpen || !selectedMovie) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg relative">
          {/* 상단 백드롭 이미지 */}
          <div className="relative h-64">
            <img
              src={
                selectedMovie.backdrop_path
                  ? `${imageBaseUrl}${selectedMovie.backdrop_path}`
                  : fallbackImage
              }
              alt="backdrop"
              className="w-full h-full object-cover"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold cursor-pointer"
              onClick={modalClose}
            >
              ×
            </button>
            <div className="absolute bottom-4 left-6 text-white">
              <h2 className="text-2xl font-bold">{selectedMovie.title}</h2>
              <p className="text-sm opacity-80">
                {selectedMovie.original_title} (
                {selectedMovie.original_language.toUpperCase()})
              </p>
            </div>
          </div>

          {/* 상세 정보 */}
          <div className="p-6 flex gap-6">
            <img
              src={
                selectedMovie.poster_path
                  ? `${imageBaseUrl}${selectedMovie.poster_path}`
                  : fallbackImage
              }
              alt="poster"
              className="w-40 h-auto rounded shadow object-cover"
            />
            <div className="text-left space-y-2">
              <p className="text-blue-600 font-bold text-xl">
                {selectedMovie.vote_average.toFixed(1)}{" "}
                <span className="text-sm text-gray-500">
                  ({selectedMovie.vote_count} 평가)
                </span>
              </p>
              <div>
                <p className="font-bold">개봉일</p>
                <p>{selectedMovie.release_date}</p>
              </div>
              <div>
                <p className="font-bold">인기도</p>
                <p>{selectedMovie.popularity.toFixed(1)}</p>
              </div>
              <div>
                <p className="font-bold">줄거리</p>
                <p className="text-sm text-gray-700">
                  {selectedMovie.overview}
                </p>
              </div>
              <div className="flex gap-3 mt-4">
                <a
                  href={`https://www.imdb.com/find?q=${encodeURIComponent(
                    selectedMovie.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  IMDb에서 검색
                </a>
                <button
                  onClick={modalClose}
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
  );
}
