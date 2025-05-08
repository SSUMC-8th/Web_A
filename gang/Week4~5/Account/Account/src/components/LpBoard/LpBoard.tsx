import { useState } from "react";
import { Lp } from "../../types/lptype";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface ILpBoard {
  lp: Lp;
  onClick: () => void;
}

function getRelativeTime(date: Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
} //상대 시간 계산 함수

export default function LpBoard({ lp, onClick }: ILpBoard) {
  const [isHovered, setisHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      className="relative shadow overflow-hidden w-full aspect-square cursor-pointer transition-transform duration-500 hover:scale-105"
      onMouseEnter={(): void => setisHovered(true)}
      onMouseLeave={(): void => setisHovered(false)}
    >
      <img
        src={`${lp.thumbnail}`}
        alt={`${lp.title}`}
        className="w-full h-full object-cover"
      />
      {isHovered && (
        <div className="flex flex-col items-baseline justify-end absolute inset-0 opacity-100 transition-opacity duration-300 backdrop-brightness-30">
          <h2 className="text-2xs text-white font-bold p-3">{lp.title}</h2>

          <div className="flex flex-row justify-between text-white p-3 w-full">
            <span>{getRelativeTime(lp.updatedAt)}</span>
            <span>❤️{lp.likes.length} </span>
          </div>
        </div>
      )}
    </div>
  );
}
