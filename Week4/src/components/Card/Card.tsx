import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TMovie } from '../../types/movieTypes';
import CardImage from './ui/CardImage';
import CardCover from './ui/CardCover';

interface CardTypes {
    movie: TMovie;
}

function Card({ movie }: CardTypes) {
    const navigate = useNavigate();

    const [isHover, setIsHover] = useState<boolean>(false);

    const showPreview = (): void => setIsHover(true);
    const hidePreview = (): void => setIsHover(false);

    const navigateToDetail = (movieId: number): void => {
        navigate(`/movies/detail/${movieId}`);
    };

    return (
        <div
            className="relative overflow-hidden transition-all duration-300 cursor-pointer rounded-2xl "
            onMouseEnter={showPreview}
            onMouseLeave={hidePreview}
            onClick={() => navigateToDetail(movie.id)}
        >
            <CardImage movie={movie} isHover={isHover} />

            {isHover && (
                <CardCover title={movie.title} overview={movie.overview} />
            )}
        </div>
    );
}

export default Card;
