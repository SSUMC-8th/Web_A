import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { getLpInfo } from '../../apis/lp';
import ErrorMessage from '../../components/ErrorMessage';
import LpCard from './component/LpCard';
import { LpItem, ResponseLpDto } from '../../types/lp';
import { SortOrder, SortOrderLabel } from '../../constants/sort';

function HomePage() {
    const [order, setOrder] = useState<SortOrder>(SortOrder.LATEST);
    const queryClient = useQueryClient();

    const { data, isError, fetchNextPage, hasNextPage, isFetching } =
        useInfiniteQuery<ResponseLpDto, Error>({
            queryKey: ['lpInfo', order],
            queryFn: ({ pageParam = null }) =>
                getLpInfo({
                    cursor: pageParam as number | null,
                    limit: 12,
                    order,
                }),
            initialPageParam: null,
            getNextPageParam: (lastPage) =>
                lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
        });

    const sentinelRef = useRef<HTMLDivElement | null>(null);

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

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value as SortOrder;
        queryClient.removeQueries({ queryKey: ['lpInfo'] });
        setOrder(selected);
    };

    if (isError) return <ErrorMessage />;

    const lpList: LpItem[] =
        data?.pages.flatMap((page) => page.data.data) ?? [];

    return (
        <div>
            <div className="flex justify-end mb-4">
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {lpList.map((lp) => (
                    <LpCard key={lp.id} lp={lp} />
                ))}
                {hasNextPage && (
                    <div ref={sentinelRef} className="h-10 col-span-full" />
                )}
            </div>
        </div>
    );
}

export default HomePage;
