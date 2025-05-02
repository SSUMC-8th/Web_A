import React from "react";
import { MoviesBody } from "../types/movie";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import NotFound from "./NotFound";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

const MovieList = () => {
  
  
  const [page, setPage] = useState<number>(1);
  const [total_pages, setTotal_Pages] = useState<number>(1);
  
  const { category } = useParams<{
    category: string;
  }>();
  
  const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`;         
  const {isLoading, isError, data: movies} = useCustomFetch<MoviesBody>(url)
  useEffect(() => {
    setPage(1);
    setTotal_Pages(movies?.total_pages ?? 0);
  }, [category,movies?.total_pages]);
  
  
  if (isError) {
    return <NotFound />
  }
  
  if (isLoading) {
    return (
      <>
        <Pagination page={page} setPage={setPage} total_pages={total_pages} />
        <div className="flex justify-center items-center h-dvh">
          <LoadingSpinner />
        </div>
      </>
    );
  }
  
  return (
    <div>
      <Pagination page={page} setPage={setPage} total_pages={total_pages} />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {movies?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
