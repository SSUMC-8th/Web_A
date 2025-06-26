import { useState } from "react";
import type { Movie} from "../types/movies"
import MovieCard from "./MovieCard"
import MovieDetail from "./movieDetail";

interface IMovieList {
  data: Movie[];
}

const MovieList = ({ data }: IMovieList) => {
     const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <div>
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {data.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
    </div>
     {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      </div>
  )
}

export default MovieList


