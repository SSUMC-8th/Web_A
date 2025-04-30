import Button from './ui/Button';

interface Tpagination {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    maxPage: number | undefined;
}

function Pagination({ page, setPage, maxPage }: Tpagination) {
    const prevPage = () => setPage((prev) => prev - 1);
    const nextPage = () => setPage((prev) => prev + 1);

    return (
        <div className="flex items-center justify-center gap-6">
            <Button onClick={prevPage} disabled={page === 1}>
                ←
            </Button>

            <span className="text-xl font-semibold text-gray-800">{`${page} / ${maxPage}`}</span>

            <Button onClick={nextPage} disabled={page === maxPage}>
                →
            </Button>
        </div>
    );
}

export default Pagination;
