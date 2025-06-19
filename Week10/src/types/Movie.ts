export type TMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type ResponseSearchMovieDto = {
  page: number;
  results: TMovie[];
  total_pages: number;
  total_results: number;
};

export type MovieFiters = {
  query: string;
  include_adult: boolean;
  language: MovieLanguage;
};

export type MovieLanguage = 'ko-KR' | 'en-US' | 'ja-JP';
