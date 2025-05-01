export type Movies = {
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

export type MoviesBody = {
  page: number;
  results: Movies[];
  total_pages: number;
  total_results: number;
};

export type MovieInfo = {
  id: number;
  title: string;
  overview: string;
  runtime: number;
  release_date: string;
  backdrop_path: string;
  poster_path:string;
  tagline:string;
};

export type CreditInfo = {
    id:number;
    name:string;
    profile_path:string;
    character:string;
    credit_id:string;
}

export type CreditBody = {
    cast: CreditInfo[];  
    crew: CreditInfo[];
}