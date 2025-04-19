import { useNavigate } from 'react-router-dom';

import { TMovie } from '../../types/movieTypes';

import CardImage from './ui/CardImage';
import CardCover from './ui/CardCover';

interface CardTypes {
    movie: TMovie;
}

function Card({ movie }: CardTypes) {
    const navigate = useNavigate();

    const navigateToDetail = () => navigate(`/movies/detail/${movie.id}`);
    return (
        <div
            className="relative overflow-hidden transition-all duration-300 cursor-pointer rounded-2xl group"
            onClick={() => navigateToDetail()}
        >
            <CardImage movie={movie} />

            <CardCover movie={movie} />
        </div>
    );
}

export default Card;
