import { Credit } from "../types/movie";

interface CreditCardProps {
  credit: Credit;
}

export default function CreditCard({ credit }: CreditCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
        alt={`${credit.name}`}
        className="rounded-full w-30 h-30 object-cover items-center justify-center "
      />
      <div>
        <p className="text-xl text-white text-center font-bold">{credit.name}</p>
        <p className="text-base text-center text-gray-200">{credit.character}</p>
      </div>
    </div>
  );
}
