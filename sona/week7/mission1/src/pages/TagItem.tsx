export function TagItem({
  tag,
  onRemove,
}: {
  tag: string;
  onRemove: () => void;
}) {
  return (
    <div className="flex mb-5 bg-gray-700 w-fit p-2 rounded-xl border-0 border-white gap-4">
      <div className=""> {tag}</div>
      <button onClick={onRemove}>x</button>
    </div>
  );
}
