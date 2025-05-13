export default function LpCommentSkeleton() {
  return (
    <div className="flex items-start gap-4 p-4 animate-pulse">
      <div className="w-10 h-10 rounded-full bg-gray-400" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="w-1/4 h-4 bg-gray-400 rounded" />
        <div className="w-full h-4 bg-gray-400 rounded" />
      </div>
    </div>
  );
}
