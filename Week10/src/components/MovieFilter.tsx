import { memo, useState } from 'react';

import Input from '@/components/Input';
import LanguageSelector from '@/components/LanguageSelector';
import SelectBox from '@/components/SelectBox';
import { LANGUAGE_OPTIONS, LANGUAGE_OPTIONS_VALUES } from '@/constants/movie';
import type { MovieFiters, MovieLanguage } from '@/types/Movie';

interface MovieFilterProps {
  onChange: (filter: MovieFiters) => void;
}

function MovieFilter({ onChange }: MovieFilterProps) {
  const [query, setQuery] = useState<string>('');
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<MovieLanguage>(
    LANGUAGE_OPTIONS_VALUES.KOREAN,
  );

  const handleSubmit = () => {
    const filters: MovieFiters = {
      query,
      include_adult: includeAdult,
      language,
    };
    onChange(filters);
  };

  console.log('필터렌더링');

  return (
    <section className="w-full p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            영화제목
          </label>
          <Input
            value={query}
            onChange={setQuery}
            placeholder="검색어를 입력해주세요"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            옵션
          </label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include_adult"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            언어
          </label>
          <LanguageSelector
            value={language}
            onChange={(value) => setLanguage(value as MovieLanguage)}
            options={LANGUAGE_OPTIONS}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow hover:bg-blue-700"
        >
          영화검색
        </button>
      </div>
    </section>
  );
}

export default memo(MovieFilter);
