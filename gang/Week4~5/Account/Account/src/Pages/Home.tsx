import LpBoard from "../components/LpBoard/LpBoard";
import { Lp } from "../types/lptype";
import { useLocation, useNavigate } from "react-router-dom";
import useGetInfiniteLpList from "../hooks/query/useGetInfiniteLpList";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LpBoardSkeleton from "../components/LpBoard/LpBoardSkeleton";
import { OrderEnum } from "../types/common";
import ArrangeButton from "../components/ArrangeButton";

function Home() {
  const location = useLocation();
  const [order, setOrder] = useState<OrderEnum>(OrderEnum.ASC);

  const {
    data: lps,
    isPending,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteLpList({ limit: 20, search: "", order });
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-2 px-2">
        <LpBoardSkeleton length={20} />
      </div>
    );
  }
  if (isError) {
    console.error(isError);
    return <div className="text-red-500">에러 발생!</div>;
  }

  return (
    <div>
      <div className="w-full flex justify-end px-4 py-2">
        <ArrangeButton order={order} setOrder={setOrder} />
      </div>

      <div className="grid sm:grid-cols-3 md:grid-cols-5 items-center justify-center px-2 gap-2">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp: Lp) => (
            <div key={lp.id} className="relative">
              <LpBoard
                lp={lp}
                onClick={() =>
                  navigate(`/lps/${lp.id}`, {
                    state: { backgroundLocation: location },
                  })
                }
              />
            </div>
          ))}
      </div>
      
      <div ref={ref} className="grid sm:grid-cols-3 md:grid-cols-5 gap-2 px-2">
        {isFetching && <LpBoardSkeleton length={20} />}
      </div>
    </div>
  );
}

export default Home;
