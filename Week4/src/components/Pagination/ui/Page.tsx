interface PageProps {
    page: number;
    maxPage: number | undefined;
}

function Page({ page, maxPage }: PageProps) {
    return (
        <span className="text-xl font-semibold text-gray-800">{`${page} / ${maxPage}`}</span>
    );
}

export default Page;
