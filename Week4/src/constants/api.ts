export const API = {
  MOVIES: (category: string, page: number) =>
    `/${category}?language=en-US&page=${page}`,

  MOVIE_DETAIL: (id: string) => `/${id}?language=ko-KR`,

  MOVIE_CREDITS: (id: string) => `/${id}/credits?language=ko-KR`,
};
