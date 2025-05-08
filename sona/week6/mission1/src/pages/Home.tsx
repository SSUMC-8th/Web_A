// import useGetLpList from "../hooks/useGetLpList";
import { useState } from "react";
import useGetLpList from "../hooks/useGetLpList";
import { Lp } from "../types/lp";
import LpCard from "./LpCard";
import { PAGENATION_ORDER } from "../enums/common";

export default function Home() {
  const [sortOrder, setSortOrder] = useState<PAGENATION_ORDER>(
    PAGENATION_ORDER.desc
  );
  const { data } = useGetLpList({
    order: sortOrder,
  });
  return (
    <>
      <div className="flex ml-auto pt-5 text-sm">
        <button
          onClick={() => setSortOrder(PAGENATION_ORDER.asc)}
          className={
            sortOrder === PAGENATION_ORDER.asc ? "clickBtn" : "noneClickBtn"
          }
        >
          오래된순
        </button>
        <button
          onClick={() => setSortOrder(PAGENATION_ORDER.desc)}
          className={
            sortOrder === PAGENATION_ORDER.desc ? "clickBtn" : "noneClickBtn"
          }
        >
          최신순
        </button>
      </div>
      <div className=" px-15 py-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data?.data?.map((item: Lp) => (
          <LpCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
