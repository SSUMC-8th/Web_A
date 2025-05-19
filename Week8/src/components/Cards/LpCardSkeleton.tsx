const LpCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg animate-pulse bg-gray-700">
      {/* 이미지 영역 */}
      <div className="w-full aspect-square bg-gray-600"></div>

      {/* 텍스트 영역 */}
      <div className="absolute inset-0 bg-black bg-opacity-80 opacity-70 flex flex-col justify-end p-4">
        <div className="h-4 bg-gray-500 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-500 rounded w-1/2 mb-1"></div>
        <div className="h-3 bg-gray-500 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default LpCardSkeleton;
