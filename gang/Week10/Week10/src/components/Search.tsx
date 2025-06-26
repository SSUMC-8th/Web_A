import { memo, useMemo, useState } from "react";
import type {  requestSearchMovie } from "../types/movies";
import SearchInput from "./SearchInput";
import SearchLanguage from "./SearchLanguage";
import SearchCheckbox from "./SearchCheckbox";

interface SearchProps {
    onChange: (filter: requestSearchMovie) => void;
    }

function Search({ onChange }: SearchProps) {

const [query, setQuery] = useState<string>("");
const [language, setLanguage] = useState<string>("ko-KR");
const [include_adult, setIncludeAdult] = useState<boolean>(false);

const handleSubmit = () => {
    const filters: requestSearchMovie = {
        query,
        include_adult,
        language,
        };
        console.log("검색 필터:", filters);
    onChange(filters);
}

  const options = useMemo(
    () => [
      { value: "ko-KR", label: "한국어" },
      { value: "en-US", label: "영어" },
      { value: "ja-JP", label: "일본어" },
    ],
    []
  );
 

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 m-10 rounded-lg shadow-md">
      <div className="flex w-full items-center justify-between gap-10 mb-4">
        <div className="flex flex-col w-1/2 items-center justify-center">
          🎬영화 제목
          <SearchInput
            value={query} onChange={setQuery}
          />
        </div>
        <div className="flex flex-col w-1/2 items-center justify-center">
          ⚙️옵션
          <SearchCheckbox
            checked={include_adult}
            onToggle={() => setIncludeAdult(!include_adult)}
          />
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-center mt-2">
        🌐언어
        <SearchLanguage
          value={language}
          options={options}
          onChange={(val) => setLanguage(val)}
        />
      </div>
      <button
        className="bg-blue-500 text-white w-full px-4 py-2 mt-2 rounded-md hover:bg-blue-600 transition-colors"
        onClick={() => handleSubmit()}
      >
        🔍검색하기
      </button>
    </div>
  );
}

export default memo(Search);
