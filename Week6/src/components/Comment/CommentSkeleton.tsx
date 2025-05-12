const CommentItemSkeleton: React.FC = () => (
  <li className="flex items-start space-x-3 py-4 border-b border-zinc-700 last:border-none animate-pulse">
    <div className="w-10 h-10 rounded-full bg-zinc-700" />
    <div className="flex-1 space-y-2">
      <div className="w-1/4 h-4 bg-zinc-700 rounded" />
      <div className="w-3/4 h-3 bg-zinc-700 rounded" />
    </div>
    <div className="w-5 h-5 bg-zinc-700 rounded" />
  </li>
);

export default CommentItemSkeleton;
