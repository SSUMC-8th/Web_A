export default function CommentSkeleton() {
  return (
    <div className="w-full flex bg-gray-700 gap-2 items-center mb-2 px-3 animate-pulse rounded">
      <div>
        <div className="size-8 rounded-2xl" />
      </div>
      {/* 텍스트 */}
      <div className="flex flex-col gap-2">
        <div className="w-24 h-3 bg-gray-500 rounded" />
        <div className="w-48 h-3 bg-gray-500 rounded" />
      </div>
    </div>
  );
}
