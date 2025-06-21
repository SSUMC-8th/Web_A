interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function InputBox({
  value,
  onChange,
  placeholder = "검색어를 입력하세요",
}: InputProps) {
  return (
    <div>
      <label className="flex items-center gap-2 font-medium mb-1">
        영화 제목
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className="w-full border rounded p-2"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
