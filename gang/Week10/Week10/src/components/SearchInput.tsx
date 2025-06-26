import { memo } from "react";

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder="영화 제목을 입력하세요"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg w-full border border-gray-400 p-2 mt-2"
    />
  );
}

export default memo(SearchInput);