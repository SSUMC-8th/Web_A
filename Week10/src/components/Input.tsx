import { type ReactElement } from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

function Input({
  value,
  onChange,
  placeholder = '검색어를 입력해주세요',
  className,
}: InputProps): ReactElement {
  return (
    <input
      className={`w-full rounded-md p-2 border-blue-300 border shadow-sm focus:border-blue-500 focus:ring-blue-500 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default Input;
