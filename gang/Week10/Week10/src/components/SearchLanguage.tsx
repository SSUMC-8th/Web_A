import { memo } from "react";

type Option = { value: string; label: string };

function SearchLanguage({
  value,
  options,
  onChange,
}: {
  value: string;
  options: Option[];
  onChange: (val: string) => void;
}) {
  console.log("🌐 Select 렌더링됨");
  return (
    <select
      className="px-4 py-2 w-full my-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default memo(SearchLanguage);
