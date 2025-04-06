import axios from "axios";

import { PulseLoader } from "react-spinners";
import Actor from "./Actor";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SimpleMovieDetail } from "../types/movie";
export default function MovieDetail() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<SimpleMovieDetail>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoadding] = useState<boolean>(false);

  useEffect((): void => {
    const fetchDetailData = async (): Promise<void> => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              Accept: "application/json",
            },
          }
        );
        setMovie(res.data);
      } catch (e) {
        console.log(e);
        setIsError(true);
      } finally {
        setIsLoadding(false);
      }
    };
    fetchDetailData();
  }, [movieId]);

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center mt-60">
          <PulseLoader color={"#828282"} />
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <div>
        <span className="text-red">error가 발생했습니다</span>
      </div>
    );
  }

  return (
    <>
      <div className=" relative w-full text-white px-10 ">
        <img
          className="absolute object-cover z-3  top-0 left-0 w-full h-full "
          src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent z-5"></div>
        <div className="relative z-10 ">
          <p className="text-2xl font-bold">
            {movie?.title || "사랑을 찾아서.."}
          </p>
          <span className="">평점:{movie?.vote_average || "5.5"}</span>
          <p>{movie?.release_date.slice(0, 4) || "2025"}</p>
          <p className="mb-7">{movie?.runtime || "87"}분</p>
          <p className="text-[20px]">{movie?.tagline || "설명.."}</p>
          <p className="max-w-96 pb-5 border-b-white border-b-2">
            {movie?.overview}
          </p>
        </div>
      </div>
      <Actor movie={movie} />
    </>
  );
}
