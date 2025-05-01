import { CreditInfo } from "../types/movie";

interface CreditCardProps {
  credit: CreditInfo;
}

export default function CreditCard({ credit }: CreditCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {credit.profile_path ? (
      <img
        src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
        alt={`${credit.name}`}
        className="rounded-full w-30 h-30 object-cover items-center justify-center"
      />
      ) : 
      <img
        src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXItcm91bmQtaWNvbiBsdWNpZGUtdXNlci1yb3VuZCI+PGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI1Ii8+PHBhdGggZD0iTTIwIDIxYTggOCAwIDAgMC0xNiAwIi8+PC9zdmc+`}
        alt={`${credit.name}`}
      className="rounded-full w-30 h-30 object-cover items-center justify-center border-4 border-neutral-700 "
    />
}
      <div>
        <p className="text-xl text-white text-center font-bold">{credit.name}</p>
        <p className="text-base text-center text-gray-200">{credit.character}</p>
      </div>
    </div>
  );
}

