import { useContext, useEffect, useState } from "react";
import { MainScrollContext } from "../layout/root-layout";

import useThrottleFn from "../hook/Throttle/useFnThrottle";

const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const mainRef = useContext(MainScrollContext);

  // ✅ setScrollY를 throttle 처리
  /*   const throttledSetScroll = useRef(
    throttle((y: number) => {
      setScrollY(y);
    }, 2000)
  ).current; */

  /*   useEffect(() => {
    if (!mainRef?.current) return;
    const el = mainRef.current;

    const onScroll = () => throttledSetScroll(el.scrollTop);

    el.addEventListener("scroll", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      throttledSetScroll.cancel();
    };
  }, [mainRef, throttledSetScroll]); */

  const throttledSetScroll = useThrottleFn((y: number) => {
    setScrollY(y);
  }, 2000);

  useEffect(() => {
    if (!mainRef?.current) return;
    const el = mainRef.current;

    const onScroll = () => throttledSetScroll(el.scrollTop);

    el.addEventListener("scroll", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [mainRef, throttledSetScroll]);

  console.log("리렌더링");

  return (
    <div className="h-dvh flex flex-col items-center justify-center text-white">
      <div>
        <h1>Throttle</h1>
        <p>ScrollY: {scrollY}px</p>
      </div>
    </div>
  );
};

export default ThrottlePage;
