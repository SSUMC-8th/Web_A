import axios from "axios";
import { useState } from "react";
import { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { PulseLoader } from "react-spinners";
import PageNation from "../components/PageNation";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const { category } = useParams<{
    category: string;
  }>();

  const {
    data: MovieData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["MovieData", page, category],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => res.data),
  });

  if (isError) {
    return (
      <div>
        <span className="text-red">error가 발생했습니다</span>
      </div>
    );
  }
  console.log(MovieData);

  return (
    <>
      <PageNation setPage={setPage} page={page} />
      {isLoading ? (
        <div className="flex items-center justify-center mt-60">
          <PulseLoader color={"#828282"} />
        </div>
      ) : (
        <div className=" p-15 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {MovieData?.results?.map((item: Movie) => {
            return <MovieCard item={item} key={item.id} />;
          })}
        </div>
      )}
    </>
  );
}
