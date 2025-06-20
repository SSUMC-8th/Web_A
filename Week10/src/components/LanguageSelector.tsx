import type { ReactElement } from 'react';

import type { MovieLanguage } from '@/types/Movie';

interface LanguageOption {
  value: string;
  label: string;
}

interface LanguageSelectorProps {
  value: string;
  onChange: (value: MovieLanguage) => void;
  options: LanguageOption[];
  className?: string;
}

function LanguageSelector({
  value,
  onChange,
  options,
  className = '',
}: LanguageSelectorProps): ReactElement {
  return (
    <select
      aria-label="언어선택"
      value={value}
      onChange={(e) => onChange(e.target.value as MovieLanguage)}
      className={`w-full rounded border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default LanguageSelector;
