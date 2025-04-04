import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import LoadingSpinner from "../components/LoadingSpinner";
import { MovieInfo, CreditBody, Credit } from "../types/movie";
import CreditCard from "../components/CreditCard";
const MovieDetailPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [movieInfo, setMovieInfo] = useState<MovieInfo | null>(null);
  const [credits, setCredits] = useState<Credit[]>([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getCredits = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const { data } = await axios.get<CreditBody>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        const filteredCredits = data.cast.map(
          ({ id, name, profile_path, character }) => ({
            id,
            name,
            profile_path,
            character,
          })
        );
        setCredits(filteredCredits);
        console.log(data.cast);
        console.log(filteredCredits);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getCredits();

    const getMovieInfo = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const { data } = await axios.get<MovieInfo>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        const newMovieInfo: MovieInfo = {
          id: data.id,
          title: data.title,
          overview: data.overview,
          runtime: data.runtime,
          release_date: data.release_date,
          poster_path: data.poster_path,
          backdrop_path: data.backdrop_path,
          tagline: data.tagline,
        };
        setMovieInfo(newMovieInfo);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieInfo();
  }, [movieId]);

  if (movieInfo != null) {
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
        <div className="relative w-full">
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
            <p className="p-2">{movieInfo.release_date} | {movieInfo.runtime}분</p>
            <h4 className="p-2 text-lg sm:text-xl md:text-2xl  text-gray-100 italic leading-loose">
              {movieInfo.tagline}
            </h4>
            <p className="p-2 text-gray-300 text-xs sm:text-sm md:text-base">{movieInfo.overview}</p>
          </div>
          </div>
          <div className="bg-neutral-800">
            <h2 className="text-white text-3xl font-medium p-3">Top Billed Cast</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-4 p-2">
              {credits.slice(0, 20).map((credit) => (
                <CreditCard key={credit.id} credit={credit}></CreditCard>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default MovieDetailPage;
