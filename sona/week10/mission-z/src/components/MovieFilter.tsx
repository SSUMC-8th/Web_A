import { memo, useState } from "react";
import type { Language, MovieFilterT } from "../types/movie";
import InputBox from "./Input";
import CheckedBox from "./checkedBox";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/movie";

interface MovieFilterProps {
  onChange: (filter: MovieFilterT) => void;
}

function MovieFilter({ onChange }: MovieFilterProps) {
  console.log("리렌더링");
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState<Language>("ko-KR");

  const handleSubmit = () => {
    const filters: MovieFilterT = {
      query,
      include_adult: includeAdult,
      language,
    };
    onChange(filters);
    // console.log(filters);
  };

  return (
    <form className="bg-white p-6 rounded-md shadow space-y-4">
      {/* 상단 제목/옵션 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputBox value={query} onChange={setQuery} />
        <div>
          <label className="flex items-center gap-2 font-medium mb-1">
            옵션
          </label>

          <CheckedBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
          />
        </div>
      </div>

      {/* 언어 선택 */}
      <div>
        <label className="flex items-center gap-2 font-medium mb-1">언어</label>
        <LanguageSelector
          value={language}
          onChange={setLanguage}
          options={LANGUAGE_OPTIONS}
        />
      </div>

      {/* 검색 버튼 */}
      <button
        type="button"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex justify-center items-center gap-2"
        onClick={handleSubmit}
      >
        검색하기
      </button>
    </form>
  );
}

export default memo(MovieFilter);
