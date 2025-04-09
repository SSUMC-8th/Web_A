import { ReactNode } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

import { TMovieCredits, TMovieDetail } from "../types/movieTypes";
import useFetch from "../hooks/useFetch";

function Detail(): ReactNode {
  const { id } = useParams<{ id: string }>();

  const detailUrl = `${import.meta.env.VITE_TMDB_URL_DETAIL}/${id}`;
  const creditsUrl = detailUrl + "/credits";

  const {
    data: movieData,
    isPending: isPending1,
    isError: isError1,
  } = useFetch<TMovieDetail>(detailUrl);
  const {
    data: creditsData,
    isPending: isPending2,
    isError: isError2,
  } = useFetch<TMovieCredits>(creditsUrl);

  if (
    isPending1 ||
    isPending2 ||
    isError1 ||
    isError2 ||
    !movieData ||
    !creditsData
  ) {
    console.log({
      isPending1,
      isPending2,
      isError1,
      isError2,
      movieData,
      creditsData,
    });
    return (
      <div className="flex items-center justify-center h-dvh">
        {(isPending1 || isPending2) && <LoadingSpinner />}
        {(isError1 || isError2) && <ErrorMessage />}
      </div>
    );
  }

  const getBackdropUrl = (path: string | null) =>
    path ? `https://image.tmdb.org/t/p/original${path}` : "/backdrop.png";

  const getProfileUrl = (path: string | null) =>
    path ? `https://image.tmdb.org/t/p/original${path}` : "/profile.png";

  return (
    <main className="bg-[#343434]">
      <div className="flex items-start gap-6 p-6">
        <div className="flex flex-col w-1/2 gap-2">
          <h1 className="text-4xl font-bold text-white ">{movieData.title}</h1>
          <p className="mb-3 text-white">{movieData.release_date}</p>
          <p className="text-white">{movieData.overview}</p>
        </div>

        <div className="w-1/2">
          <img
            src={getBackdropUrl(movieData.backdrop_path)}
            alt="movie_backdrop"
            className="object-cover w-full shadow max-h-96 rounded-xl"
          />
        </div>
      </div>

      <div className="p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">출연진</h2>
        <div className="grid grid-cols-6 gap-4">
          {creditsData.cast.slice(0, 12).map((actor) => (
            <div
              key={actor.id}
              className="flex flex-col items-center p-2 text-center bg-white rounded-lg shadow hover:scale-105"
            >
              <img
                src={getProfileUrl(actor.profile_path)}
                alt={actor.name}
                className="object-cover w-24 h-24 mb-2 rounded-full"
              />
              <p className="text-sm font-medium">{actor.name}</p>
              <p className="text-xs text-gray-500">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Detail;
