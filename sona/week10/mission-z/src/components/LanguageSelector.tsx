interface LanguageOption {
  value: string;
  label: string;
}

interface LanguageOprionProps {
  value: string;
  onChange: (value: string) => void;
  options: LanguageOption[];
  className?: string;
}

export default function LanguageSelector({
  value,
  onChange,
  options,
}: LanguageOprionProps) {
  return (
    <select
      className="w-full border rounded p-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => {
        return <option value={option.value}>{option.label}</option>;
      })}
    </select>
  );
}
