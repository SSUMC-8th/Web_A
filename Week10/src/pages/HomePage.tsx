import { useCallback, useMemo, useState } from 'react';

import MovieFilter from '@/components/MovieFilter';
import MovieList from '@/components/MovieList';
import { TMDB_API_PATHS } from '@/constants/api';
import { LANGUAGE_OPTIONS_VALUES } from '@/constants/movie';
import { useFetch } from '@/hooks/useFetch';
import type { MovieFiters, ResponseSearchMovieDto } from '@/types/Movie';

function Homepage() {
  const [filters, setFilters] = useState<MovieFiters>({
    query: '어벤져스',
    include_adult: false,
    language: LANGUAGE_OPTIONS_VALUES.KOREAN,
  });

  const axiosrequestConfig = useMemo(
    (): { params: MovieFiters } => ({
      params: filters,
    }),
    [filters],
  );

  const { data, error, isPending } = useFetch<ResponseSearchMovieDto>(
    TMDB_API_PATHS.SEARCH_MOVIE,
    axiosrequestConfig,
  );

  const handleMovieFilters = useCallback((filters: MovieFiters) => {
    setFilters(filters);
  }, []);

  if (error)
    return <div className="mt-12 text-center text-red-500">에러 ㅅㄱㅇ</div>;

  return (
    <main className="w-full max-w-6xl px-4 py-8 mx-auto space-y-10">
      <MovieFilter onChange={handleMovieFilters} />
      {isPending && (
        <div className="flex items-center justify-center h-40 text-gray-500">
          로딩중 ㄱㄷ
        </div>
      )}
      <MovieList data={data?.results ?? []} />
    </main>
  );
}

export default Homepage;
