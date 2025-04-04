import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import LoadingSpinner from "../components/LoadingSpinner";
import { CreditInfo, CreditBody } from "../types/movie";

const Credit = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [credits, setCredits] = useState<CreditInfo[]>([]);
  const { movieId } = useParams();
  console.log(movieId);
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
        setCredits(data.casts);

        console.log(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getCredits();
  }, [movieId]);
  if(credits!=null){
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
          <div className="relative w-full flex">
            <img
              src={`https://image.tmdb.org/t/p/w500${credits.profile_path}`}
              alt={`${credits.}`}
              className="w-full h-auto object-cover brightness-20 "
            />
            <p>{credits.name}</p>
            <p>{credits.character}</p>
          </div>
    );
  }
};

export default Credit;
