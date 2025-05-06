import { useNavigate } from 'react-router-dom';
import { LpItem } from '../../../types/lp';
import LpCardCover from './LpCardCover';

interface LpCardProps {
    lp: LpItem;
}

function LpCard({ lp }: LpCardProps) {
    const navigate = useNavigate();

    const navigateToLpDetail = () => {
        navigate(`/lp/${lp.id}`);
    };

    return (
        <div
            className="relative overflow-hidden transition-transform duration-300 cursor-pointer aspect-square group hover:scale-105"
            onClick={navigateToLpDetail}
        >
            <img
                src={lp.thumbnail}
                alt={lp.title}
                className="object-cover w-full h-full"
            />
            <LpCardCover lp={lp} />
        </div>
    );
}

export default LpCard;
