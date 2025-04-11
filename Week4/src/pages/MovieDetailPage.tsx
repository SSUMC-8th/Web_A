import { useParams } from "react-router-dom";
import { CreditDetail, MovieDetail } from "../types/movie";
import MovieDetailInfo from "../components/MovieInfo/MovieInfo";
import MovieDetailPeople from "../components/MovieInfo/MovieCreditInfo";
import LoadingSpinner from "../components/LoadingSpinner";
import useCustomFetch from "../hook/useCustomFetch";
import { API } from "../constants/api";
import { Language } from "../constants/language";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  // non-null 단언
  // !를 붙여줌으로써 해당 값은 undefined가 아님을 명시적으로 선언 ex) movieId!
  // 주의 : 무조건 값이 존재할 변수에만 선언해주어야한다.

  // URL 선언
  const MovieDataURL = API.MOVIE_DETAIL(movieId!);
  const CreditDataURL = API.MOVIE_CREDITS(movieId!);

  const {
    data: MovieDetailData,
    isError: MovieDetailError,
    isPending: MoviePending,
  } = useCustomFetch<MovieDetail>(MovieDataURL, Language.Korean);
  const {
    data: CreditData,
    isError: CreditError,
    isPending: CreditPending,
  } = useCustomFetch<CreditDetail>(CreditDataURL, Language.Korean);

  const isPending = MoviePending || CreditPending;

  if (MovieDetailError || CreditError)
    return (
      <div className="text-red-500 p-4">데이터를 불러오는 중 오류 발생</div>
    );

  return (
    <div className="text-white p-8 min-h-screen bg-black">
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && MovieDetailData && CreditData && (
        <>
          <MovieDetailInfo movie={MovieDetailData} />
          <MovieDetailPeople people={CreditData.cast} />
        </>
      )}
    </div>
  );
};

export default MovieDetailPage;
