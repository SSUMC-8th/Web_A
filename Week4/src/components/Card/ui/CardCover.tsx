import clsx from 'clsx';
import { TMovie } from '../../../types/movieTypes';

interface CardCoverProps {
    movie: TMovie;
    isHover: boolean;
}

function CardCover({ movie, isHover }: CardCoverProps) {
    return (
        <div
            className={clsx(
                'absolute inset-0 flex flex-col justify-center px-4 py-4 text-center transition-opacity duration-300 bg-black',
                isHover ? ' bg-opacity-60' : 'opacity-0',
            )}
        >
            <h5 className="mb-4 text-xl text-white">{movie.title}</h5>
            <p className="overflow-hidden text-sm text-white">
                {movie.overview}
            </p>
        </div>
    );
}

export default CardCover;
