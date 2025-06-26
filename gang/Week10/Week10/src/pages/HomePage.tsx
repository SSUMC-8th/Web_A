import { useCallback, useMemo, useState } from "react";
import Search from "../components/Search";
import useFetch from "../hooks/useFetch";
import type { requestSearchMovie, responseMovie } from "../types/movies";
import MovieList from "../components/MovieList";

function HomePage() {
  // 검색 필터 (실제 API 호출에 사용)
  const [filters, setFilters] = useState<requestSearchMovie>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  // 검색 버튼을 눌렀을 때만 실제 필터를 업데이트
  const handleMovieFilters = useCallback((filters: requestSearchMovie) => {
    setFilters(filters);
  }, []);

  const axiosRequestConfig = useMemo(
    () => ({
      params: filters,
    }),
    [filters]
  );

  const { data, isLoading, error } = useFetch<responseMovie>(
    "/search/movie",
    axiosRequestConfig
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div>
        <Search onChange={handleMovieFilters} />
      </div>
      {isLoading && <div>로딩중...</div>}

      <MovieList data={data?.results ?? []} />
    </div>
  );
}

export default HomePage;
