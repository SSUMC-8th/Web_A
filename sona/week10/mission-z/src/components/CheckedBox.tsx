interface CheckedBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id?: string;
}

export default function CheckedBox({
  checked,
  onChange,
  id = "checkbox",
  label,
}: CheckedBoxProps) {
  return (
    <div className="flex items-center gap-2 border pb-3 pt-2 rounded-sm">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        className="border rounded p-2 ml-3"
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
    </div>
  );
}
