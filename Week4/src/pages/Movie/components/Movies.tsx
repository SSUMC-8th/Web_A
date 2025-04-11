import { useState, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorMessage from '../../../components/ErrorMessage';
import Card from '../../../components/Card/Card';
import Pagination from '../../../components/Pagination/Pagination';

import { TMovieResponse } from '../../../types/movieTypes';
import useFetch from '../../../hooks/useFetch';
import { paramsType } from '../types/MovieTypes';
import { urlMap } from '../constants/urlMap';

function Movies(): ReactNode {
    const { category } = useParams<paramsType>();

    const [page, setPage] = useState<number>(1);

    const url = category ? urlMap[category] : undefined;

    const { data, isPending, isError } = useFetch<TMovieResponse>(url, page);

    //category 변경 시 state 초기화
    useEffect(() => {
        setPage(1);
    }, [category]);

    //로딩/에러 처리
    if ((isPending && !data) || isError) {
        return (
            <div className="flex items-center justify-center h-dvh">
                {isPending && !data && <LoadingSpinner />}
                {isError && <ErrorMessage />}
            </div>
        );
    }

    return (
        <main className="flex flex-col items-center justify-center py-4">
            <Pagination
                page={page}
                setPage={setPage}
                maxPage={data?.total_pages}
            />

            <div className="grid grid-cols-6 gap-4 p-4">
                {data?.results.map((movie) => (
                    <Card key={movie.id} movie={movie} />
                ))}
            </div>
        </main>
    );
}

export default Movies;
