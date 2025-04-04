import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

import { TMovie } from "../types/movieTypes";

type TCast = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

function Detail(): ReactNode {
  const { id } = useParams<{ id: string }>();

  const [movie, setMovie] = useState<TMovie | null>(null);
  const [cast, setCast] = useState<TCast[]>([]);

  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async (): Promise<void> => {
      setIsPending(true);
      setIsError(false);

      try {
        const headers = {
          Authorization: `${import.meta.env.VITE_TMDB_KEY}`,
        };

        const [movieRes, creditsRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?language=ko`, {
            headers,
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
            headers,
          }),
        ]);

        setMovie(movieRes.data);
        setCast(creditsRes.data.cast.slice(0, 12));
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (isPending || isError || !movie) {
    return (
      <div className="flex items-center justify-center h-dvh">
        {isPending && <LoadingSpinner />}
        {isError && <ErrorMessage />}
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
          <h1 className="text-4xl font-bold text-white ">{movie.title}</h1>
          <p className="mb-3 text-white">{movie.release_date}</p>
          <p className="text-white">{movie.overview}</p>
        </div>

        <div className="w-1/2">
          <img
            src={getBackdropUrl(movie.backdrop_path)}
            alt="movie_backdrop"
            className="object-cover w-full shadow max-h-96 rounded-xl"
          />
        </div>
      </div>

      <div className="p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">출연진</h2>
        <div className="grid grid-cols-6 gap-4">
          {cast.map((actor) => (
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
