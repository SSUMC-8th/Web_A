import LpBoard from "../components/LpBoard/LpBoard";
import { Lp } from "../types/lptype";
import { useLocation, useNavigate } from "react-router-dom";
import useGetInfiniteLpList from "../hooks/query/useGetInfiniteLpList";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LpBoardSkeleton from "../components/LpBoard/LpBoardSkeleton";
import { OrderEnum } from "../types/common";
import ArrangeButton from "../components/ArrangeButton";

import { useDebounce } from "../hooks/useDebounce";
import { DEBOUNCE_SEARCH_TIME } from "../constants/key";
import SearchBar from "../components/SearchBar";
import useThrottledFn from "../hooks/useThrottleFn";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderEnum>(OrderEnum.ASC);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const debounced = useDebounce<string>(searchQuery, DEBOUNCE_SEARCH_TIME);


  const {
    data: lps,
    isPending,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,

  } = useGetInfiniteLpList({ limit: 20, search: debounced, order });

  const { ref, inView } = useInView({
    threshold: 0,
  });
  const throttledFetchNextPage = useThrottledFn(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, 10000);

  useEffect(() => {
    console.log("inView:", inView);
    if (inView) {
      throttledFetchNextPage();

    }
  }, [inView, throttledFetchNextPage]);

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

      <div className="flex justify-center m-2 p-3">
        <div className="w-full max-w-xl">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

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


      <div className="w-full flex justify-center py-10" ref={ref}>
        {isPending && <LpBoardSkeleton length={20} />}

      </div>
    </div>
  );
}

export default Home;
