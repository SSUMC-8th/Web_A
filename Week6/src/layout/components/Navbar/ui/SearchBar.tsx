import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import ROUTES from '#/constants/routes';
import useDebounce from '#/layout/hooks/useDebounce';
import useGetLpList from '#/layout/hooks/useGetLpList';
import { LpItem } from '#/types/lp';

function SearchBar() {
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce<string>(searchValue, 500); // 디바운싱만 적용

  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data } = useGetLpList({ search: debouncedValue });
  const lpList: LpItem[] = data?.pages.flatMap((page) => page.data.data) ?? [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpenSearchBar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center gap-1" ref={ref}>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpenSearchBar ? 'w-52 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="검색어를 입력해주세요."
          className="w-full p-1 text-sm border-b-2 border-black outline-none"
        />
      </div>

      <img
        src="/search.png"
        alt="search-icon"
        className="h-6 cursor-pointer"
        onClick={() => setIsOpenSearchBar(true)}
      />

      {isOpenSearchBar && searchValue.trim() !== '' && lpList.length > 0 && (
        <ul className="absolute z-10 mt-1 overflow-auto bg-white border border-gray-300 rounded shadow-md top-full w-52 max-h-60">
          {lpList.map((lp) => (
            <li
              key={lp.id}
              className="px-3 py-2 text-sm truncate cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(ROUTES.LP_DETAIL(lp.id))}
            >
              {lp.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
