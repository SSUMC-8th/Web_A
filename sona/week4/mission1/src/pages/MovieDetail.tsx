import { PulseLoader } from "react-spinners";
import Actor from "./Actor";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useApiEffect";
import { SimpleMovieDetail } from "../types/movie";

export default function MovieDetail() {
  const { movieId } = useParams<{ movieId: string }>();
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

  const {
    data: movieDetail,
    isLoading,
    isError,
  } = useCustomFetch<SimpleMovieDetail>(url);

  console.log(movieDetail);
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
          src={`https://image.tmdb.org/t/p/w500/${movieDetail?.backdrop_path}`}
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent z-5"></div>
        <div className="relative z-10 ">
          <p className="text-2xl font-bold">
            {movieDetail?.title || "사랑을 찾아서.."}
          </p>
          <span className="">평점:{movieDetail?.vote_average || "5.5"}</span>
          <p>{movieDetail?.release_date.slice(0, 4) || "2025"}</p>
          <p className="mb-7">{movieDetail?.runtime || "87"}분</p>
          <p className="text-[20px]">{movieDetail?.tagline || "설명.."}</p>
          <p className="max-w-96 pb-5 border-b-white border-b-2">
            {movieDetail?.overview}
          </p>
        </div>
      </div>
      <Actor movieDetail={movieDetail} />
    </>
  );
}
