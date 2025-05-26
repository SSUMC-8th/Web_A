import { useEffect, useRef, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { IMAGE_PATH } from '@/constants/images';
import ROUTES from '@/constants/routes';
import useGetLpList from '@/features/lps/hooks/useGetLpList';
import useDebounce from '@/hooks/useDebounce';
import { LpItem } from '@/types/lps';

function SearchBar() {
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce<string>(searchValue, 100); // 디바운싱만 적용
  const location = useLocation();

  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data } = useGetLpList({
    search: debouncedValue,
    enabled: debouncedValue.trim() !== '',
  });
  const lpList: LpItem[] = data?.pages.flatMap((page) => page.data.data) ?? [];

  const navigateToSearchPage = () => {
    if (searchValue.trim().length === 0) return;
    //상수화 필요함
    // encodeURIComponent === URI의 구성 요소를 인코딩하여, 특수 문자가 포함된 문자열을 안전하게 URI에 포함시킬 수 있도록 해주는 함수
    // encodueURI === 전체 URI 인코딩. 공백 등 일부 특수 문자 인코딩. (?, & 등의 문자는 인코딩하지 않음)
    // encodeURIComponent === 거의 모든 특수 문자 인코딩
    navigate(`/search?keyword=${encodeURIComponent(searchValue)}`);
  };

  //페이지 이동시마다 검색창 닫기
  useEffect(() => {
    setIsOpenSearchBar(false);
  }, [location]);

  //검색창 조작 함수
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              navigateToSearchPage();
            }
          }}
          placeholder="검색어를 입력해주세요."
          className="w-full p-1 text-sm border-b-2 border-black outline-none"
        />
      </div>

      <img
        src={IMAGE_PATH.SEARCH_ICON}
        alt="search-icon"
        className="h-6 cursor-pointer"
        onClick={
          isOpenSearchBar
            ? navigateToSearchPage
            : () => setIsOpenSearchBar(true)
        }
      />

      {isOpenSearchBar && debouncedValue.trim() !== '' && lpList.length > 0 && (
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
