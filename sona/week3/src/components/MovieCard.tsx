import { useState } from "react";
import { Movie } from "../types/movie";

interface MovieProps {
  item: Movie;
}

export default function MovieCard({ item }: MovieProps) {
  // console.log(item);
  // console.log(item.poster_path);
  const [isHovered, setIsHovered] = useState(false);
  // console.log(isHovered);
  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
      key={item.id}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
    >
      <img
        className=""
        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
        alt=""
      />
      {isHovered && (
        <div
          className="absolute inset-0  text-white bg-gradient-to-t from-black/70 to-transparent backdrop-blur-md 
        flex flex-col justify-center items-center p-4"
        >
          <h2 className="text-lg font-bold">{item.title}</h2>
          <p className="text-sm text-gray-300 leading-relaxed overflow-hidden mt-2 line-clamp-5">
            {item.overview}
          </p>
        </div>
      )}
    </div>
  );
}
