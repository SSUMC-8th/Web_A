import { useState } from 'react';

import type { TMovie } from '@/types/Movie';

import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

interface MovieListProps {
  data: TMovie[];
}

const MovieList = ({ data }: MovieListProps) => {
  const [selectedMovie, setSelectedMovie] = useState<TMovie | null>(null);

  if (!data.length)
    return (
      <div className="py-10 text-center text-gray-400">
        검색 결과가 없습니다.
      </div>
    );

  return (
    <>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8">
        {data.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className="cursor-pointer"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </section>
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
};

export default MovieList;
