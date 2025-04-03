import { Cast } from "../../types/movie";

const MovieDetailPeople = ({ people }: { people: Cast[] }) => {
  return (
    <div>
      <h4 className="text-white text-lg sm:text-xl font-medium my-4">
        감독/출현
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-5 justify-center">
        {people.slice(0, 20).map((person) => (
          <div
            key={person.id}
            className="flex flex-col items-center justify-center w-full"
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
              alt={person.name}
              className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full object-cover border-2 border-white"
            />
            <h4 className="text-white mt-2 text-center text-xs sm:text-sm">
              {person.name}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailPeople;
