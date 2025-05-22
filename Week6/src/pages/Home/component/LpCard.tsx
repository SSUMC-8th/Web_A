import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { IMAGE_PATH } from '#/constants/images';
import ROUTES from '#/constants/routes';
import { LpItem } from '#/types/lps';

import LpCardCover from './LpCardCover';
import LpCardSkeleton from './LpCardSkeleton';

interface LPCardProps {
  lp: LpItem;
}

function LpCard({ lp }: LPCardProps) {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative overflow-hidden transition-transform duration-300 cursor-pointer aspect-square group hover:scale-105"
      onClick={() => navigate(ROUTES.LP_DETAIL(lp.id))}
    >
      {!loaded && <LpCardSkeleton />}

      <img
        src={lp.thumbnail ?? IMAGE_PATH.LP}
        alt={lp.title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`object-cover w-full h-full transition-opacity duration-300
                    ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {loaded && <LpCardCover lp={lp} />}
    </div>
  );
}

export default LpCard;
