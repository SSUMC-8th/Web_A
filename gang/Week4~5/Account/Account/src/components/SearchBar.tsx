
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="검색어를 입력하세요."
      className="w-full bg-black text-white border border-white p-2 rounded-md pr-10"
    />
  );
}
 
export default SearchBar;
