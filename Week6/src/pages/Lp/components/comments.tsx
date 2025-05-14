import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef, useEffect, useState, ChangeEvent } from 'react';
import { getComments } from '../../../apis/lp';
import { CommentItem, ResponseCommentDto } from '../../../types/lp';
import { BulletList } from 'react-content-loader';
import ErrorMessage from '../../../components/ErrorMessage';
import { SortOrder, SortOrderLabel } from '../../../constants/sort';
import { useCreateComments } from '../hooks/useCreateComments';
import Comment from './comment';

const CommentSkeleton = () => <BulletList />;

function Comments({ lpId }: { lpId: number }) {
    const [order, setOrder] = useState<SortOrder>(SortOrder.LATEST);
    const [newComment, setNewComment] = useState<string>('');

    const {
        data,
        isPending,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<ResponseCommentDto, Error>({
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

    const { mutate: createComment } = useCreateComments();

    const handleCreateComment = () => {
        createComment({
            lpId,
            content: newComment,
        });
        setNewComment('');
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

            <div className="flex w-full">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleCreateComment();
                        }
                    }}
                    placeholder="댓글을 입력해주세요"
                    aria-label="댓글입력"
                    className="flex-1 p-2 text-sm border border-gray-400 rounded-md"
                />
                <button
                    className="p-2 text-white bg-gray-400 border rounded-md"
                    onClick={handleCreateComment}
                >
                    작성
                </button>
            </div>

            {comments.map((comment) => (
                <Comment lpId={lpId} comment={comment} />
            ))}

            {(isFetchingNextPage || isPending) &&
                Array.from({ length: 2 }).map((_, i) => (
                    <CommentSkeleton key={i} />
                ))}

            {hasNextPage && <div ref={sentinelRef} className="h-6" />}
        </div>
    );
}

export default Comments;
