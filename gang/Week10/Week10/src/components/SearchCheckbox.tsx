import { memo } from "react";

function SearchCheckbox({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) {
  console.log("🔘 Checkbox 렌더링됨");
  return (
    <label className="flex items-center border border-gray-400 p-2 rounded-lg w-full space-x-2 mt-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="w-4 h-4"
      />
      <span>성인 콘텐츠 표시</span>
    </label>
  );
}

export default memo(SearchCheckbox);
