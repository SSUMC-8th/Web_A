// import useGetLpList from "../hooks/useGetLpList";
import useGetLpList from "../hooks/useGetLpList";
import { Lp } from "../types/lp";
import LpCard from "./LpCard";

export default function Home() {
  const { data } = useGetLpList({});
  console.log(data);

  return (
    <div className=" p-15 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {data?.data?.map((item: Lp) => (
        <LpCard key={item.id} item={item} />
      ))}
    </div>
  );
}
