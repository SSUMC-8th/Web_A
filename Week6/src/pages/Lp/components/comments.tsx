import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef, useEffect, useState, ChangeEvent } from 'react';
import { getComments } from '../../../apis/lp';
import { CommentItem, ResponseCommentDto } from '../../../types/lp';
import { BulletList } from 'react-content-loader';
import ErrorMessage from '../../../components/ErrorMessage';
import { SortOrder, SortOrderLabel } from '../../../constants/sort';

const CommentSkeleton = () => <BulletList />;

function Comments({ lpId }: { lpId: number }) {
    const [order, setOrder] = useState<SortOrder>(SortOrder.LATEST);

    const { data, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery<ResponseCommentDto, Error>({
            queryKey: ['comments', lpId, order],
            queryFn: ({ pageParam = null }) =>
                getComments({
                    lpId,
                    cursor: pageParam as number,
                    limit: 10,
                    order,
                }),
            initialPageParam: null,
            getNextPageParam: (last) =>
                last.data.hasNext ? last.data.nextCursor : undefined,
            staleTime: 1000 * 60,
        });

    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!sentinelRef.current || !hasNextPage) return;
        const io = new IntersectionObserver(
            (entries) => entries[0].isIntersecting && fetchNextPage(),
            { threshold: 0.1 },
        );
        io.observe(sentinelRef.current);
        return () => io.disconnect();
    }, [sentinelRef.current, hasNextPage, fetchNextPage]);

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value as SortOrder;
        setOrder(selected);
    };

    if (isError) return <ErrorMessage />;

    const comments: CommentItem[] =
        data?.pages.flatMap((p) => p.data.data) ?? [];

    return (
        <div className="p-2 pb-6 space-y-4 overflow-hidden focus:outline-none">
            <div className="pb-2">
                <select
                    value={order}
                    aria-label="정렬"
                    onChange={handleSelectChange}
                    className="px-2 py-1 text-xs bg-white border rounded "
                >
                    {Object.entries(SortOrderLabel).map(([value, label]) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>

            {comments.map((c) => (
                <div key={c.id} className="flex items-start gap-3">
                    <img
                        src={c.author.avatar ?? '/my.png'}
                        alt={c.author.name}
                        className="object-cover w-10 h-10 rounded-full shrink-0"
                    />
                    <div className="flex-1">
                        <div className="text-sm font-semibold">
                            {c.author.name}
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {c.content}
                        </p>
                        <span className="text-xs text-gray-400">
                            {new Date(c.createdAt).toLocaleString()}
                        </span>
                    </div>
                </div>
            ))}

            {isFetchingNextPage &&
                Array.from({ length: 2 }).map((_, i) => (
                    <CommentSkeleton key={i} />
                ))}

            {hasNextPage && <div ref={sentinelRef} className="h-6" />}
        </div>
    );
}

export default Comments;
