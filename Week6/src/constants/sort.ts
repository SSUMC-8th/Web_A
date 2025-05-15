export enum SortOrder {
    LATEST = 'desc',
    OLDEST = 'asc',
}

export const SortOrderLabel: Record<SortOrder, string> = {
    [SortOrder.LATEST]: '최신 순',
    [SortOrder.OLDEST]: '오래된 순',
};
