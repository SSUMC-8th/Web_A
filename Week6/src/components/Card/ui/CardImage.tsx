import { TMovie } from '../../../types/movieTypes';

interface CardImageProps {
    movie: TMovie;
}

function CardImage({ movie }: CardImageProps) {
    return (
        <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="object-cover transition duration-300 pointer-events-none group-hover:blur-sm group-hover:scale-105"
        />
    );
}

export default CardImage;
