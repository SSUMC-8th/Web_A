import { useNavigate } from 'react-router-dom';

import { TMovie } from '../../types/movieTypes';
import CardImage from './ui/CardImage';
import CardCover from './ui/CardCover';
import useHover from '../../hooks/useHover';

interface CardTypes {
    movie: TMovie;
}

function Card({ movie }: CardTypes) {
    const navigate = useNavigate();

    const [CardRef, isHover] = useHover<HTMLDivElement>();

    const navigateToDetail = (movieId: number): void => {
        navigate(`/movies/detail/${movieId}`);
    };

    return (
        <div
            className="relative overflow-hidden transition-all duration-300 cursor-pointer rounded-2xl "
            ref={CardRef}
            onClick={() => navigateToDetail(movie.id)}
        >
            <CardImage movie={movie} isHover={isHover} />

            <CardCover movie={movie} isHover={isHover} />
        </div>
    );
}

export default Card;
