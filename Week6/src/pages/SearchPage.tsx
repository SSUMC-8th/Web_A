import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import ErrorMessage from '#/components/ErrorMessage';
import { SortOrder, SortOrderLabel } from '#/constants/sort';
import useGetLpList from '#/features/lps/hooks/useGetLpList';
import { LpItem } from '#/types/lps';

import LpCard from './Home/component/LpCard';

function SearchPage() {
  const [order, setOrder] = useState<SortOrder>(SortOrder.LATEST);
  //queryClient는 컴포넌트마다 구현해야 하나?
  const queryClient = useQueryClient();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const { data, isError, fetchNextPage, hasNextPage, isFetching } =
    useGetLpList({ search: keyword, order: order });

  console.log(data);

  //무한스크롤 함수, 언마운트까지
  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) fetchNextPage();
      },
      { threshold: 0.1 },
    );
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [sentinelRef.current, hasNextPage, isFetching, fetchNextPage]);

  //미리보기. removeQueries 안의 queryKey 첫번째만 같으면 첫번째 키가 같은 모든 쿼리가 삭제됨.
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as SortOrder;
    queryClient.removeQueries({ queryKey: ['lpInfo'] });
    setOrder(selected);
  };

  if (isError) return <ErrorMessage />;

  const lpList: LpItem[] = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div>
      <div className="flex items-center justify-end gap-2 mb-4 text-sm">
        <span>검색결과 :</span>
        {/* useInfiteQuery라 전체 게시물 개수 받아오지 못함. 따로 요청 필요할 듯 */}
        <span>{lpList.length}</span>
        <select
          value={order}
          aria-label="정렬"
          onChange={handleSelectChange}
          className="px-2 py-1 text-sm bg-white rounded-md focus:outline-none"
        >
          {Object.entries(SortOrderLabel).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {lpList.length === 0 ? (
        <div className="w-full text-center">검색결과가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {lpList.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}

          {hasNextPage && (
            <div ref={sentinelRef} className="h-10 col-span-full" />
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
