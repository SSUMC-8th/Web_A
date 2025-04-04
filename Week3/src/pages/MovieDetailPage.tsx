import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios-instance";
import { CreditDetail, MovieDetail } from "../types/movie";
import MovieDetailInfo from "../components/MovieInfo/MovieInfo";
import MovieDetailPeople from "../components/MovieInfo/MovieCreditInfo";
import LoadingSpinner from "../components/LoadingSpinner";

const MovieDetailPage = () => {
  const [movie, setMovie] = useState<MovieDetail>();
  const [credit, setCredit] = useState<CreditDetail>();
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  const { movieId } = useParams<{ movieId: string }>();

  useEffect(() => {
    const fetchDetailMovie = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const { data: movieData } = await axiosInstance.get<MovieDetail>(
          `${movieId}?language=ko-KR`
        );

        const { data: creditData } = await axiosInstance.get<CreditDetail>(
          `${movieId}/credits?language=ko-KR`
        );

        setMovie(movieData);
        setCredit(creditData);
      } catch (error) {
        console.error("영화 상세 불러오기 실패:", error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    if (movieId) fetchDetailMovie();
  }, [movieId]);

  if (isError)
    return (
      <div className="text-red-500 p-4">데이터를 불러오는 중 오류 발생</div>
    );

  console.log(movie);

  return (
    <div className="text-white p-8 min-h-screen bg-black">
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && movie && credit && (
        <>
          <MovieDetailInfo movie={movie} />
          <MovieDetailPeople people={credit.cast} />
        </>
      )}
    </div>
  );
};

export default MovieDetailPage;
