
export default function LpBoardSkeleton({ length }: { length: number }) {
  return (
    <div>
      {Array.from({ length }).map((_, idx) => (
        <div key={idx} className="relative shadow-lg overflow-hidden duration-300 animate-pulse">
          <div className="w-full h-48 bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
}
