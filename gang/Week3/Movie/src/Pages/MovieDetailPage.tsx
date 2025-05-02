import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import LoadingSpinner from "../components/LoadingSpinner";
import { MovieInfo, CreditBody, CreditInfo } from "../types/movie";
import CreditCard from "../components/CreditCard";
import useCustomFetch from "../hooks/useCustomFetch";

const MovieDetailPage = () => {
  //영화 페이지에 쓸 영화 정보
  const [movieInfo, setMovieInfo] = useState<MovieInfo | null>(null);
  //인물 정보
  const [casts, setCasts] = useState<CreditInfo[]>([]);
  const [crews, setCrews] = useState<CreditInfo[]>([]);
  const { movieId } = useParams();
  //각 정보를 받아올 url
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  //각각 정보를 받아와서 커스텀 훅 사용
  const {
    data: creditsData,
    isLoading,
    isError,
  } = useCustomFetch<CreditBody>(creditsUrl);
  const { data: movieData } = useCustomFetch<MovieInfo>(movieUrl);

  useEffect(() => {
    //cast와 crew 따로 받아오기 
    if (creditsData) {
      const filteredCasts = creditsData.cast.map(
        ({ id, name, profile_path, character,credit_id }) => ({
          id,
          name,
          profile_path,
          character,
          credit_id,
        })
      );
      const filteredCrews = creditsData.crew.map(
        ({ id, name, profile_path, character, credit_id }) => ({
          id,
          name,
          profile_path,
          character,
          credit_id,
        })
      );

      setCasts(filteredCasts);
      setCrews(filteredCrews);
    }
  }, [creditsData]);
  useEffect(() => {
    if (movieData) {
      const filteredMovieInfo: MovieInfo = {
        id: movieData.id,
        title: movieData.title,
        overview: movieData.overview,
        runtime: movieData.runtime,
        release_date: movieData.release_date,
        poster_path: movieData.poster_path,
        backdrop_path: movieData.backdrop_path,
        tagline: movieData.tagline,
      };

      setMovieInfo(filteredMovieInfo);

    }
  }, [movieData]);
  if (movieInfo!= null) {
    if (isLoading) {
      return (
        <>
          <div className="flex justify-center items-center h-dvh">
            <LoadingSpinner />;
          </div>
        </>
      );
    }
    if (isError) {
      return <NotFound />;
    }
    return (
      <>
        <div className="relative w-screen">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieInfo.backdrop_path}`}
            alt={`${movieInfo.title}`}
            className="w-full  h-[50vh] sm:h-[60vh]  object-cover brightness-20 "
          />
          <div className="absolute top-1 left-1 flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full sm:w-4/5 ">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
              alt={`${movieInfo.title}`}
              className=" w-1/6 h-auto m-5 rounded-2xl shadow-lg"
            />
            <div className="m-3 py-10 text-white text-center sm:text-left max-w-3xl ">
              <h2 className="py-4 p-2 text-4xl font-bold">{movieInfo.title}</h2>
              <p className="p-2">
                {movieInfo.release_date} | {movieInfo.runtime}분
              </p>
              <h4 className="p-2 text-lg sm:text-xl md:text-2xl  text-gray-100 italic leading-loose">
                {movieInfo.tagline}
              </h4>
              <p className="p-2 text-gray-300 text-xs sm:text-sm md:text-base">
                {movieInfo.overview}
              </p>
            </div>
          </div>
          <div className="bg-neutral-800">
            <h2 className="text-white text-3xl text-left font-medium ps-4">
              Top Billed Cast
            </h2>
            <div className=" p-2">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-4 p-2">
                {casts.slice(0, 10).map((cast) => (
                  <CreditCard key={cast.credit_id} credit={cast}></CreditCard>
                ))}
              </div>
              <h2 className="text-white text-3xl text-left font-medium py-4 ps-4">
                Crew{" "}
              </h2>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-4 p-2">
                {crews.slice(0, 10).map((crew) => (
                  <CreditCard key={crew.credit_id} credit={crew}></CreditCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default MovieDetailPage;
