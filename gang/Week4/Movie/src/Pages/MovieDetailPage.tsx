import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import LoadingSpinner from "../components/LoadingSpinner";
import { MovieInfo, CreditBody, CreditInfo } from "../types/movie";
import CreditCard from "../components/CreditCard";
import useCustomFetch from "../hooks/useCustomFetch";
const MovieDetailPage = () => {
  const { movieId } = useParams<{
    movieId: string;
  }>();

  const PeopleInfoURL = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const MovieInfoURL = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const {
    isError,
    isLoading,
    data: PeopleData,
  } = useCustomFetch<CreditBody>(PeopleInfoURL);
  const { data: movieInfos } = useCustomFetch<MovieInfo>(MovieInfoURL);
  if (PeopleData != null && movieInfos != null) {
    const casts: CreditInfo[] = PeopleData.cast.map(
      ({ id, name, profile_path, character }) => ({
        id,
        name,
        profile_path,
        character,
      })
    );
    const crews: CreditInfo[] = PeopleData.crew.map(
      ({ id, name, profile_path, character }) => ({
        id,
        name,
        profile_path,
        character,
      })
    );
    const movieInfo: MovieInfo = {
      id: movieInfos.id,
      title: movieInfos.title,
      overview: movieInfos.overview,
      runtime: movieInfos.runtime,
      release_date: movieInfos.release_date,
      poster_path: movieInfos.poster_path,
      backdrop_path: movieInfos.backdrop_path,
      tagline: movieInfos.tagline,
    };

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
                  <CreditCard key={cast.id} credit={cast}></CreditCard>
                ))}
              </div>
              <h2 className="text-white text-3xl text-left font-medium py-4 ps-4">
                Crew{" "}
              </h2>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-4 p-2">
                {crews.slice(0, 10).map((crew) => (
                  <CreditCard key={crew.id} credit={crew}></CreditCard>
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
