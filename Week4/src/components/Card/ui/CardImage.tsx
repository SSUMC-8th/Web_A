import clsx from 'clsx';
import { TMovie } from '../../../types/movieTypes';

interface CardImageProps {
    movie: TMovie;
    isHover: boolean;
}

function CardImage({ movie, isHover }: CardImageProps) {
    return (
        <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className={clsx(
                'object-cover transition duration-300',
                isHover && 'blur-sm scale-105',
            )}
        />
    );
}

export default CardImage;
