import { TMovie } from '../../../types/movieTypes';

interface CardCoverProps {
    movie: TMovie;
}

function CardCover({ movie }: CardCoverProps) {
    return (
        <div className="absolute inset-0 flex flex-col justify-center px-4 py-4 text-center transition-opacity duration-300 bg-black opacity-0 pointer-events-none bg-opacity-60 group-hover:opacity-100">
            <h5 className="mb-4 text-xl text-white">{movie.title}</h5>
            <p className="overflow-hidden text-sm text-white">
                {movie.overview}
            </p>
        </div>
    );
}

export default CardCover;
