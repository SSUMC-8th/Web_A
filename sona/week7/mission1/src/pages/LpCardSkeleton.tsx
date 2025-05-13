export default function LpCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg animate-pulse">
      <div className="w-full h-60 bg-gray-400 rounded-xl" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 bg-gray-600 rounded" />
          <div className="w-20 h-3 bg-gray-500 rounded" />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-500 rounded-full" />
          <div className="w-4 h-3 bg-gray-500 rounded" />
        </div>
      </div>
    </div>
  );
}
